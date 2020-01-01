exports.getCharacter = (req, res) => {
    const session = req.driver.session();
    // Run Cypher query
    const cypher = 'MATCH (n) RETURN count(n) as count';

    session.run(cypher)
        .then(result => {
            // On result, get count from first record
            const count = result.records[0].get('count');

            // Send response
            res.send({ count: count.toNumber() });
        })
        .catch(e => {
            // Output the error
            res.status(500).send(e);
        })
        .then(() => session.close());
};

exports.getAllCharacters = (req, res) => {
    const session = req.driver.session();
    const cypher = 'MATCH (character:Character) RETURN character';
    session.run(cypher)
        .then(result => res.send({ records: result.records.map(record => record.toObject()) }))
        .catch(e => {
            console.log(e)
            // Output the error
            res.status(500).send("Error trying to reach the database");
        })
        .then(() => session.close());
};

exports.createCharacter = (req, res) => {
    const newCharacter = req.body.character;
    console.log(newCharacter)

    const session = req.driver.session();

    // Run Cypher query
    const cypher = "CREATE (Test:Character {name:'" + newCharacter.name
        + "', born:'" + newCharacter.birthDate
        + "'}), id(n) as nodeId";

    session.run(cypher)
        .then(result => res.send({ result }))
        .catch(e => {
            console.log(e)
            // Output the error
            res.status(500).send("Error trying to reach the database");
        })
        .then(() => session.close());
};

exports.updateCharacter = (req, res) => {
    /*character.findOneAndUpdate({
        _id: req.params.characterId
    }, req.body,
        (err, character) => {
            if (err) {
                res.send(err);
            }

            res.json(character);
        });
        */
};

exports.deleteCharacter = (req, res) => {
    /*character.remove({
        _id: req.params.characterId
    }, (err) => {
        if (err) {
            res.send(err);
        }

        res.json({
            message: `character ${req.params.characterId} successfully deleted`
        });
    });*/
};