const blocks = [
  {
    "type": "input",
    "block_id": "titulo",
    "element": {
      "type": "plain_text_input",
      "action_id": "titulo-action",
      "placeholder": {
        "type": "plain_text",
        "text": "Qual problema estamos tratando?",
        "emoji": true
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Titulo",
      "emoji": true
    }
  },
  {
    "type": "input",
    "block_id": "responsavel",
    "element": {
      "type": "multi_users_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Quem estará a frente dessa tratativa?",
        "emoji": true
      },
      "action_id": "responsavel-action"
    },
    "label": {
      "type": "plain_text",
      "text": "Responsável",
      "emoji": true
    }
  },
  {
    "type": "input",
    "block_id": "descricao",
    "element": {
      "type": "plain_text_input",
      "placeholder": {
        "type": "plain_text",
        "text": "O que está acontecendo? Onde? E por que?",
        "emoji": true
      },
      "multiline": true,
      "action_id": "descricao-action"
    },
    "label": {
      "type": "plain_text",
      "text": "Descrição do problema",
      "emoji": true
    }
  },
  {
    "type": "input",
    "block_id": "criticidade",
    "element": {
      "type": "static_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Qual o tamanho do problema?",
        "emoji": true
      },
      "options": [
        {
          "text": {
            "type": "plain_text",
            "text": ":red_circle: Alto",
            "emoji": true
          },
          "value": "ALTO"
        },
        {
          "text": {
            "type": "plain_text",
            "text": ":large_yellow_circle: Médio",
            "emoji": true
          },
          "value": "MÉDIA"
        },
        {
          "text": {
            "type": "plain_text",
            "text": ":large_green_circle: Baixo",
            "emoji": true
          },
          "value": "BAIXA"
        }
      ],
      "action_id": "criticidade-action"
    },
    "label": {
      "type": "plain_text",
      "text": "Criticidade",
      "emoji": true
    }
  },
  {
    "type": "input",
    "block_id": "impacto",
    "element": {
      "type": "static_select",
      "placeholder": {
        "type": "plain_text",
        "text": "O problema afeta os ganhos da companhia?",
        "emoji": true
      },
      "options": [
        {
          "text": {
            "type": "plain_text",
            "text": ":thumbsup: Sim",
            "emoji": true
          },
          "value": "VERDADEIRO"
        },
        {
          "text": {
            "type": "plain_text",
            "text": ":thumbsdown: Não",
            "emoji": true
          },
          "value": "FALSO"
        }
      ],
      "action_id": "impacto-action"
    },
    "label": {
      "type": "plain_text",
      "text": "Impacto Financeiro",
      "emoji": true
    }
  },
  {
    "type": "input",
    "block_id": "link_tarefa",
    "element": {
      "type": "plain_text_input",
      "placeholder": {
        "type": "plain_text",
        "text": "Kambanize, Jira ou Outra ferramenta",
        "emoji": true
      },
      "action_id": "link_tarefa-action"
    },
    "label": {
      "type": "plain_text",
      "text": "Link da Tarefa",
      "emoji": true
    }
  },
  {
    "type": "input",
    "block_id": "link_war_room",
    "optional": true,
    "element": {
      "type": "plain_text_input",
      "placeholder": {
        "type": "plain_text",
        "text": "Insira o link da War Room",
        "emoji": true
      },
      "action_id": "link_war_room-action"
    },
    "label": {
      "type": "plain_text",
      "text": "War Room",
      "emoji": true
    }
  },
  {
    "type": "input",
    "block_id": "link_thread",
    "optional": true,
    "element": {
      "type": "plain_text_input",
      "placeholder": {
        "type": "plain_text",
        "text": "Insira o link da thread, para se manter atualizado",
        "emoji": true
      },
      "action_id": "link_thread-action"
    },
    "label": {
      "type": "plain_text",
      "text": "Link da Thread do Incidente",
      "emoji": true
    }
  },
  {
    "type": "input",
    "block_id": "data_hora_inicio",
    "element": {
      "type": "datetimepicker",
      "initial_date_time": Math.floor(new Date().getTime()/1000.0),
      "action_id": "data_hora_inicio-action"
    },
    "label": {
      "type": "plain_text",
      "text": "Data e Hora de Inicio do Problema"
    }
  },
  {
    "type": "input",
    "block_id": "mencoes",
    "optional": true,
    "element": {
      "type": "multi_users_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Selecione o(s) usuário(s) que deseja notificar agora",
        "emoji": true
      },
      "action_id": "mencoes-action"
    },
    "label": {
      "type": "plain_text",
      "text": "Deseja mencionar alguém?",
      "emoji": true
    }
  }
]

module.exports = {
  blocks
}