const { blocks } = require('../blocks/form-postmortem-ocorrencia');

const buttonUrlAction = async ({ ack }) => {
  await ack();
}

const newChildPostmortem = async ({ ack, body, client, logger, payload }) => {
  await ack();

  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'child_postmortem_view_sent',
        title: {
          type: 'plain_text',
          text: 'Nova Ocorrência'
        },
        blocks,
        submit: {
          type: 'plain_text',
          text: 'Criar'
        },
        private_metadata: payload.value
      }
    });
  } catch (error) {
    logger.error(error);
    logger.error(JSON.stringify(error?.data?.response_metadata));
  }
}

module.exports = {
  buttonUrlAction,
  newChildPostmortem
}