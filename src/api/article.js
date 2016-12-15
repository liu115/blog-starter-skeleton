import { Router } from 'express';

// import model
import { Article } from '../models/';

const articleRouter = new Router();

articleRouter.get('/', (req, res) => {
  Article.find().exec( (err, articles) => {
    if (err) return res.status(500).send(err);

    return res.json(articles);
  });
});

articleRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return res.status(500).send(err);

    //send err if error
    return res.json(article);
  });
});

articleRouter.post('/', (req, res) => {
  const { title, content, tags } = req.body;
  Article.create({
    title,
    content,
    tags,
  }, (err, article) => {
    //send err if error
    return res.json(article);
  });
});

articleRouter.put('/:id', (req, res) => {
  const id = req.params.id;
  const { title, content, tags } = req.body;
  Article.findById(id, (err, article) => {
    if (err) return res.status(500).send(err);
    article.title = title;
    article.content = content;
    article.tags = tags;
    article.save( (saveErr, updatedArticle) => {
      if (err) return res.status(500).send(saveErr);
      res.json(updatedArticle);
    });
  });
});

articleRouter.delete('/:id', (req, res) => {
  const id = req.params.id;
  Article.findById(id).remove(err => {
    if (err) return res.status(500).send(err);
    res.send("ok");
  });
});

export default articleRouter;
