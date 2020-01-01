import character from '../controllers/characterController';

export default (app) => {
    app.route('/characters')
        .get(character.getAllCharacters)
        .post(character.createCharacter);

    app.route('/characters/:characterId')
        .get(character.getCharacter)
        .put(character.updateCharacter)
        .delete(character.deleteCharacter);
};