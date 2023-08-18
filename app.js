const { App } = require('@slack/bolt');
const { postMortemCommand } = require('./src/modules/commands');
const { buttonUrlAction, newChildPostmortem } = require('./src/modules/actions');
const { getBlocks: getMessageBlocksPostmortemCreated } = require('./src/blocks/message-postmortem-created');
const { getValues } = require('./src/utils/get_values_view');
const { getStringDate } = require('./src/utils/formatters');
const { getEmail } = require('./src/utils/get_user_email');
const { appendValues } = require('./src/services/client-sheets');
const { randomUUID } = require('crypto');

require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  // logLevel: LogLevel.DEBUG,
});

app.command('/postmortem', postMortemCommand);

app.action(/button_url/, buttonUrlAction);
app.action('new_child_action_id', newChildPostmortem);

app.event('app_home_opened', async ({ event, client, logger }) => {
  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        type: "home",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Bem vindo, <@" + event.user + "> :house:*"
            }
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Esse é o Aplicativo do Painel Interativo."
            }
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `
              *[Fluxos disponíveis:]*
              1. Criação do Postmortem
                  1. Comando `+"`/postmortem`"+`
                  2. Formulário com os dados
                  3. Gravação dos dados na planilha do Google
                  4. Envio da Mensagem no canal que centraliza as ocorrências (#postmortem)
                  5. Envio das Mensagens Diretas para os usuários Notificados (_opcional_)

                \n\n2. Acessar War Room (_sala para resolução do problema_)${
                '\n     1. Botão `War Room` presente na mensagem do *tópico 1.4*'}${
                '\n     2. Abertura de nova guia no browser para acessar'}
                
                \n\n3. Acessar Card da Tarefa (_Registro formal relacionado ao problema_)${
                '\n     1. Botão `Card da Tarefa` presente na mensagem do *tópico 1.4*'}${
                '\n     2. Abertura de nova guia no browser para acessar'}

                \n\n4. Criação de nova Ocorrência (_Criação de uma nova ocorrência relacionada ao Incidente/Postmortem_)${
                '\n     1. Botão `Continuar ocorrência` presente na mensagem do *tópico 1.4*'}${
                '\n     2. Formulário com os dados'}${
                '\n     3. Gravação dos dados na planilha do Google'}${
                '\n     4. Envio da Mensagem na conversa (thread) relacionado as informações (#postmortem)'}
              `
            }
          },
        ]
      }
    });
  } catch (error) {
    logger.error(error);
  }
});



app.view('postmortem_view_sent', async ({ ack, body, view, client, logger }) => {
  logger.info('Sent request to postmortem...')
  
  await ack();
  
  const values = getValues(view['state']['values'])
  const userId = body['user']['id'];
  const itemId = randomUUID();
  const responsaveisEmail = await Promise.all((values['responsavel']).map(value => getEmail(client, value)))
  
  try {
    await Promise.all((values['mencoes']).map(
      user => client.chat.postMessage({
        channel: user,
        text: 'Postmortem criado com sucesso',
        blocks: getMessageBlocksPostmortemCreated({
          titulo: values['titulo'],
          criticidade: values['criticidade'],
          descricao: values['descricao'],
          impacto: values['impacto'],
          tarefa: values['link_tarefa'],
          responsavelIds: values['responsavel'],
          reuniao: values['link_war_room'] ? values['link_war_room'] : null,
          mencoesIds: values['mencoes'],
        })
      })
    ));

    await appendValues('Página1', [
      itemId,
      values['titulo'],
      responsaveisEmail.join(','),
      values['descricao'],
      values['criticidade'],
      values['impacto'],
      getStringDate(values['data_hora_inicio']),
      '',
      'ABERTO',
      `R$ ${values['valores'] || '0'}`,
    ])

    await client.chat.postMessage({
      channel: process.env.POSTMORTEM_CHANNEL,
      text: 'Postmortem criado com sucesso',
      blocks: getMessageBlocksPostmortemCreated({
        id: itemId,
        titulo: values['titulo'],
        criticidade: values['criticidade'],
        descricao: values['descricao'],
        impacto: values['impacto'],
        tarefa: values['link_tarefa'],
        responsavelIds: values['responsavel'],
        reuniao: values['link_war_room'] ? values['link_war_room'] : null,
        mencoesIds: values['mencoes'],
        only_message: false
      })
    });
  } catch (error) {
    logger.error(error);
  }
});

app.view('child_postmortem_view_sent', async ({ ack, body, view, client, logger }) => {
  logger.info('Sent request to postmortem child...')
  
  await ack();
  
  const values = getValues(view['state']['values'])
  const userId = body['user']['id'];
  const idMain = JSON.parse(view.private_metadata)['id'];
  logger.info('in view -> '+idMain)
  
  try {
    
  } catch (error) {
    logger.error(error);
  }
});

(async () => {
  await app.start();
  console.log('⚡️ Bolt app started');
})();