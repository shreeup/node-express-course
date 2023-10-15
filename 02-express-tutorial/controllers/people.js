const { people } = require("../data");

function addPerson(req, res) {
  if (!req.body.name)
    res.status(400).json({ success: false, message: "Please provide a name" });
  else {
    people.push({ id: people.length, name: req.body.name });
    res.status(201).json({ success: true, name: req.body.name });
  }
}

function getPeople(req, res) {
  res.json({
    message: "Displaying the people from our catalog",
    people: people,
  });
}

function getPerson(req, res) {
  let selectedPerson = people.find((r) => r.id === parseInt(req.params.id));
  if (selectedPerson)
    res.status(200).json({ success: true, entry: selectedPerson });
  else
    res.status(400).json({
      success: false,
      message:
        "Person you are trying to reach is unavailable, please try later!",
    });
}

function putPerson(req, res) {
  let selectedPerson = people.find((r) => r.id === parseInt(req.params.id));
  if (selectedPerson) {
    selectedPerson.name = req.body.name;
    res.status(200).json({ success: true, entry: selectedPerson });
  } else
    res.status(400).json({
      success: false,
      message:
        "Person you are trying to reach is unavailable, please try later!",
    });
}

function deletePerson(req, res) {
  let selectedPerson = people.find((r) => r.id === parseInt(req.params.id));
  if (selectedPerson) {
    people.filter((p) => p.id === parseInt(req.params.id));
    res.status(200).json({
      success: true,
      message: "Virus removed! New Inventory is here!",
      people: people,
    });
  } else
    res.status(400).json({
      success: false,
      message:
        "Person you are trying to reach is unavailable, please try later!",
    });
}

module.exports = {
  addPerson,
  getPeople,
  getPerson,
  putPerson,
  deletePerson,
};
