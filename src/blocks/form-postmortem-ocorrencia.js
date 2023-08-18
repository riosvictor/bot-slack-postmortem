const blocks = [
  {
    "optional": true,
    "type": "input",
    "block_id": "servico_fora",
    "element": {
      "type": "plain_text_input",
      "action_id": "servico_fora-action",
      "placeholder": {
        "type": "plain_text",
        "text": "Qual nome do(s) serviço(s) impactado(s)?",
        "emoji": true
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Serviço Impactado",
      "emoji": true
    }
  },
  {
    "optional": true,
    "type": "input",
    "block_id": "squad_responsavel",
    "element": {
      "type": "plain_text_input",
      "placeholder": {
        "type": "plain_text",
        "text": "Nome da Squad responsável pela ação",
        "emoji": true
      },
      "action_id": "squad_responsavel-action"
    },
    "label": {
      "type": "plain_text",
      "text": "Squad Responsável",
      "emoji": true
    }
  },
  {
    "optional": true,
    "type": "input",
    "block_id": "repositorio_github",
    "element": {
      "type": "plain_text_input",
      "placeholder": {
        "type": "plain_text",
        "text": "Link do repositório",
        "emoji": true
      },
      "action_id": "repositorio_github-action"
    },
    "label": {
      "type": "plain_text",
      "text": "Repositório Responsável",
      "emoji": true
    }
  },
  {
    "type": "input",
    "block_id": "descricao_acao",
    "element": {
      "type": "plain_text_input",
      "placeholder": {
        "type": "plain_text",
        "text": "Descrição da ação que será tomada",
        "emoji": true
      },
      "multiline": true,
      "action_id": "descricao_acao-action"
    },
    "label": {
      "type": "plain_text",
      "text": "Descrição da ação",
      "emoji": true
    }
  },
  {
    "type": "input",
    "block_id": "responsavel",
    "element": {
      "type": "users_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Pessoa responsável pela ação",
        "emoji": true
      },
      "action_id": "responsavel-action"
    },
    "label": {
      "type": "plain_text",
      "text": "Pessoa Responsável",
      "emoji": true
    }
  },
  {
    "optional": true,
    "type": "input",
    "block_id": "dados_adicionais_acao",
    "element": {
      "type": "plain_text_input",
      "placeholder": {
        "type": "plain_text",
        "text": "Maiores detalhes da ação tomada",
        "emoji": true
      },
      "multiline": true,
      "action_id": "dados_adicionais_acao-action"
    },
    "label": {
      "type": "plain_text",
      "text": "Dados adicionais da ação",
      "emoji": true
    }
  },
  {
    "type": "input",
    "block_id": "data_hora_prazo",
    "element": {
      "type": "datetimepicker",
      "initial_date_time": Math.floor(new Date().getTime()/1000.0),
      "action_id": "data_hora_prazo-action"
    },
    "label": {
      "type": "plain_text",
      "text": "Prazo de conclusão"
    }
  }
]

module.exports = {
  blocks
}