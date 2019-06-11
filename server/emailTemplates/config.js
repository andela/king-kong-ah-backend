import Mailgen from 'mailgen';

export const APP_NAME = 'Author\'s Haven - King-Kong Devs';

export const getMailGenerator = link => new Mailgen({
  theme: 'default',
  product: {
    name: APP_NAME,
    link
  }
});
