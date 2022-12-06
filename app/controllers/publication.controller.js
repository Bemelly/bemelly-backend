const Publication = require("../models/publication.model");
const Counter = require("../models/counter.model");

class PublicationService {
  async getPublications(req, res) {
    const result = await Publication.find();
    res.status(200).send(result);
  }
  async getUserPublications(req, res) {
    try {
      const user = req.params.CC;
      const result = await Publication.find({ ownerCC: user });
      res.status(200).send(result);
    } catch (err) {
      res.status(404).json({
        error: err,
      });
    }
  }
  async newPublication(req, res) {
    try {
      let publication = req.body;
      publication.id = await counterFn("publicationCounter");
      await Publication.create(publication);
      res.status(200).send("Publicacion creada correctamente");
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async deletePublication(req, res) {
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
  }

  async modifyPublication(req, res) {
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
  }

  async newReview(req, res) {
    const review = req.body;
    review.review.idReview = await counterFn("reviewCounter");
    const publication = await Publication.findOne({ id: review.id });
    publication.reviews.push(review.review);
    await Publication.findOneAndUpdate(
      { id: review.id },
      { reviews: publication.reviews }
    );
    res.send("Se ha creado el comentario correctamente");
  }

  async deleteReview(req, res) {
    const idComentario = req.body.idReview;
    const idPublication = req.body.idPublication;
    const publication = await Publication.findOne({ id: idPublication });
    const comentarios = publication.reviews;
    for (let i = 0; i < comentarios.length; i++) {
      if (comentarios[i].idReview === idComentario) {
        comentarios.splice(i, 1);
        await Publication.findOneAndUpdate(
          { id: idPublication },
          { reviews: comentarios }
        );
        res.send(publication);
      }
    }
  }

  async modifyReview(req, res) {
    try {
      const idComentario = req.body.idReview;
      const nuevoComentario = req.body.modified;
      const idPublication = req.body.idPublication;
      const publication = await Publication.findOne({ id: idPublication });
      const comentarios = publication.reviews;
      for (let i = 0; i < comentarios.length; i++) {
        if (comentarios[i].idReview === idComentario) {
          if (nuevoComentario.score) {
            comentarios[i].score = nuevoComentario.score;
          }
          if (nuevoComentario.comment) {
            comentarios[i].comment = nuevoComentario.comment;
          }
          await Publication.findOneAndUpdate(
            { id: idPublication },
            { reviews: comentarios }
          );
          return res.send("comentario modificado correctamente");
        }
      }
      return res.send("hubo un error");
    } catch (err) {
      return res.send("hubo un error");
    }
  }
}
const counterFn = async (counterName) => {
  let contador = await Counter.findOne({ id: counterName });
  newValue = contador.seq_value + 1;
  await Counter.findOneAndUpdate({ id: counterName }, { seq_value: newValue });
  return contador.seq_value;
};
module.exports = PublicationService;
