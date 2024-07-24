const TITLE: string = 'TITLE';
const SALT_ROUNDS = 10;
const jwtConstants = {
    secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
    exp: '1h'
};
export { TITLE, SALT_ROUNDS, jwtConstants };
