const { blocks } = require('../blocks/form-postmortem');

const postMortemCommand = async ({ ack, body, client, logger }) => {
  await ack();

  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'postmortem_view_sent',
        title: {
          type: 'plain_text',
          text: 'Novo Postmortem'
        },
        blocks,
        submit: {
          type: 'plain_text',
          text: 'Criar'
        }
      }
    });
  } catch (error) {
    logger.error(error);
    logger.error(JSON.stringify(error?.data?.response_metadata));
  }
}

module.exports = {
  postMortemCommand
}