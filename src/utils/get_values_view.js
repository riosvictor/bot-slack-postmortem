const ETypes = {
  plain_text_input: 'plain_text_input',
  multi_users_select: 'multi_users_select',
  static_select: 'static_select',
  datetimepicker: 'datetimepicker'
};

function getValues(values){
  const response = {};
  const keys = Object.keys(values);

  for (const key of keys) {
    const item = values[key][`${key}-action`];
    const type = item['type']

    if (type == ETypes.plain_text_input)
      response[key] = item.value;
    if (type == ETypes.multi_users_select)
      response[key] = item.selected_users;
    if (type == ETypes.static_select)
      response[key] = item.selected_option.value;
    if (type == ETypes.datetimepicker)
      response[key] = item.selected_date_time;
  }

  return response
}

module.exports = {
  getValues
}