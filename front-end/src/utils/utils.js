const ROLE_OPTIONS = [
  { text: 'Vendedor', value: 'seller' },
  { text: 'Cliente', value: 'customer' },
];

const EMAIL_REGEX = /.+@.+\..+/;
const NAME_LENGTH = 12;
const PWD_LENGTH = 6;

module.exports = {
  ROLE_OPTIONS,
  EMAIL_REGEX,
  NAME_LENGTH,
  PWD_LENGTH,
};
