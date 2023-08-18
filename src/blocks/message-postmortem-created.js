function getBlocks({id, titulo, descricao, responsavelIds, criticidade, impacto, tarefa, reuniao = null, mencoesIds = [], only_message = true}){
  const temReuniao = !!reuniao
  const divider = {type: 'divider'}
  const buttonWarRoom = {
    type: 'button',
    text: {
      type: 'plain_text',
      text: 'War Room',
      emoji: true
    },
    style: 'danger',
    url: `${reuniao}`,
    action_id: 'button_url-0'
  }
  const payload = {
    id
  }
  const buttons = {
    type: 'actions',
    elements: [
      {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'Card da Tarefa',
          emoji: true
        },
        style: 'primary',
        url: `${tarefa}`,
        action_id: 'button_url-1'
      },
      {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'Continuar ocorrência',
          emoji: true
        },
        style: 'primary',
        value: JSON.stringify(payload),
        action_id: 'new_child_action_id'
      },
      {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'Finalizar',
          emoji: true
        },
        style: 'primary',
        value: JSON.stringify(payload),
        action_id: 'finalizar_action_id'
      }
    ]
  }
  const blocks = [
    {
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: `*[Postmortem | ${titulo}]*`
			}
		},
    divider,
    {
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: `>*:bookmark: Descrição:* ${descricao
          }\n>*:bust_in_silhouette: Responsável:*\n${responsavelIds.map((user) => `><@${user}>`).join('\n')
          }\n>*:vertical_traffic_light: Criticidade:* ${criticidade
          }\n>*:alert: Impacto Financeiro:* ${impacto ? 'Sim' : 'Não'
          }\n${`>*:people_hugging: Pessoas Envolvidas:*\n${mencoesIds.map((user) => `><@${user}>`).join('\n')}`
        }`
			}
		}
  ]

  if (temReuniao){
    buttons.elements = [buttonWarRoom, ...buttons.elements]
  }
  if (!only_message){
    blocks.push(divider, buttons)
  }

  return blocks
} 

module.exports = {
  getBlocks
}