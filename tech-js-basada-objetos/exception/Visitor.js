class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }

  accept(visitor) {
    visitor.visitCustomError(this);
  }
}

RangeError.prototype.accept = function (visitor) {
  visitor.visitRangeError(this);
}

String.prototype.accept = function(visitor) {
  visitor.visitStringError(this);
}

class Visitor {

  execute() {
    console.log(`Sentencia previa`);
    try {
      if (Math.random() < 0.5) {
        throw new RangeError("descripcion");
      }
      if (Math.random() < 0.5) {
        throw new CustomError("descripcion");
      }
      if (Math.random() < 0.5) {
        throw 'descuidado';
      }
      console.log("Sentencia ejecutada?");
    } catch (exception) {
      exception.accept(this);
    }
    console.log(`Sentencia posterior`);
  }

  visitCustomError(exception) {
    this.#showException(exception);
  }

  visitRangeError(exception) {
    this.#showException(exception);
  }

  visitStringError(message) {
    this.#showException({name: 'String', message});
  }

  #showException(exception) {
    console.log("Acciones catch: " + exception.name + ": " + exception.message);
  }

}

new Visitor().execute()

