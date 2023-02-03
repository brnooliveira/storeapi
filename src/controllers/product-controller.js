"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product-repository");

exports.get = (request, response, next) => {
  repository
    .get()
    .then((data) => {
      response.status(200).send(data);
    })
    .catch((e) => {
      response.status(400).send(e);
    });
};

exports.getBySlug = (request, response, next) => {
  repository
    .getBySlug(request.params.slug)
    .then((data) => {
      response.status(200).send(data);
    })
    .catch((e) => {
      response.status(400).send(e);
    });
};

exports.getById = (request, response, next) => {
  repository
    .getById(request.params.id)
    .then((data) => {
      response.status(200).send(data);
    })
    .catch((e) => {
      response.status(400).send(e);
    });
};

exports.getByTag = (request, response, next) => {
  repository
    .getByTag(request.params.tag)
    .then((data) => {
      response.status(200).send(data);
    })
    .catch((e) => {
      response.status(400).send(e);
    });
};

exports.post = (request, response, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    request.body.title,
    3,
    "O titulo deve conter pelo menos 3 caracteres!"
  );
  contract.hasMinLen(
    request.body.slug,
    3,
    "o slug deve ter no minimo 3 caracteres!"
  );
  contract.hasMinLen(
    request.body.description,
    3,
    "a descricao deve ter pelo menos 3 caracteres"
  );

  // Se os dados forem invalidos
  if (!contract.isValid()) {
    response.status(400).send(contract.errors()).end();
    return;
  }

  repository
    .create(request.body)
    .then((x) => {
      response.status(201).send({ message: "Produto cadastrado com sucesso!" });
    })
    .catch((e) => {
      response
        .status(400)
        .send({ message: "Falha ao cadastrar o produto", data: e });
    });
};

exports.put = (request, response, next) => {
  repository
    .update(request.params.id, request.body)
    .then((x) => {
      response.status(200).send({
        message: "Produto atualizado com sucesso!",
      });
    })
    .catch((e) => {
      response.status(400).send({
        message: "Falha ao atualizar produto!",
        data: e,
      });
    });
};

exports.delete = (request, response, next) => {
  repository
    .delete(request.body.id)
    .then((x) => {
      response.status(200).send({
        message: "Produto removido com sucesso!",
      });
    })
    .catch((e) => {
      response.status(400).send({
        message: "Falha ao remover produto!",
        data: e,
      });
    });
};
