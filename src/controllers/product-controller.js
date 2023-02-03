"use strict";

const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product-repository");

exports.get = async (request, response, next) => {
  try {
    var data = await repository.get();
    response.status(200).send(data);
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar sua requicisao",
    });
  }
};

exports.getBySlug = async (request, response, next) => {
  try {
    var data = await repository.getBySlug(request.params.slug);
    response.status(200).send(data);
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar sua requicisao!",
    });
  }
};

exports.getById = async (request, response, next) => {
  try {
    var data = await repository.getById(request.body.id);
    response.status(200).send(data);
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar sua requicisao",
    });
  }
};

exports.getByTag = async (request, response, next) => {
  try {
    var data = await repository.getByTag(request.params.tag);
    response.status(200).send(data);
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar sua requisicao",
    });
  }
};

exports.post = async (request, response, next) => {
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

  try {
    await repository.create(request.body);
    response.status(201).send({
      message: "Produto cadastrado com sucesso",
    });
  } catch (e) {
    response.status(500).send({
      message: "Falha ao registrar o produto!",
    });
  }
};

exports.put = async (request, response, next) => {
  try {
    await repository.update(request.params.id, request.body);
    response.status(200).send({
      messsage: "Produto atualizado com sucesso",
    });
  } catch (e) {
    response.status(500).send({
      messsage: "Falha ao processar sua requisicao!",
    });
  }
};

exports.delete = async (request, response, next) => {
  try {
    await repository.delete(request.body.id);
    response.status(200).send({
      message: "Produto removido com sucesso!",
    });
  } catch (e) {
    response.status(500).send({
      messsage: "Falha ao processar sua requisicao",
    });
  }
};
