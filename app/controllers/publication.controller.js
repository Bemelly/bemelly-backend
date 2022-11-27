const Publication = require("../models/publication.model");
const Counter = require("../models/counter.model");

const getPublications = async (req, res) => {
  const result = await Publication.find();
  res.status(200).send(result);
};
const getUserPublications = async (req, res) => {
  const user = req.params.CC;
  const result = await Publication.find({ ownerCC: user });
  res.status(200).send(result);
};
const newPublication = async (req, res) => {
  try {
    let publication = req.body;
    publication.id = await counterFn("publicationCounter");
    await Publication.create(publication);
    res.status(200).send("Publicacion creada correctamente");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deletePublication = async (req, res) => {
  try {
    const publication = req.body;
    await Publication.findOneAndDelete({
      id: publication.id,
      ownerCC: publication.ownerCC,
    });
    res.send("Se ha eliminado la publicacion correctamente");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const modifyPublication = async (req, res) => {
  const publication = req.body;
  await Publication.findOneAndUpdate(
    { id: publication.id },
    { serviceName: publication.serviceName }
  );
  await Publication.findOneAndUpdate(
    { id: publication.id },
    { description: publication.description }
  );
  await Publication.findOneAndUpdate(
    { id: publication.id },
    { price: publication.price }
  );
  await Publication.findOneAndUpdate(
    { id: publication.id },
    { tags: publication.tags }
  );
  res.send("la publicacion ha sido modificada");
};

const newReview = async (req, res) => {
  const review = req.body;
  review.review.idReview = await counterFn("reviewCounter");
  const publication = await Publication.findOne({ id: review.id });
  publication.reviews.push(review.review);
  await Publication.findOneAndUpdate(
    { id: review.id },
    { reviews: publication.reviews }
  );
  res.send("Se ha creado el comentario correctamente");
};

const counterFn = async (counterName) => {
  let contador = await Counter.findOne({ id: counterName });
  newValue = contador.seq_value + 1;
  await Counter.findOneAndUpdate({ id: counterName }, { seq_value: newValue });
  return contador.seq_value;
};
module.exports = {
  newPublication,
  deletePublication,
  modifyPublication,
  getPublications,
  getUserPublications,
  newReview,
};
