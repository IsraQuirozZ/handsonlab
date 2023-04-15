// Calculadora positiva con promesas
// ¿Cómo lo hacemos? Se crearán un conjunto de funciones gestionadas por promesas y un entorno ASÍNCRONO
// donde podremos ponerlas a prueba

// Para todas las operaciones/funciones:
// - Debe devolver una promesa que se resuelva siempre que el resultado sea positivo.
// - En caso de que algún número NO sea número, rechazar la promesa indicando “Solo números”
// - En caso de que algún número sea cero, rechazar la promesa indicando “Operación innecesaria”

// Definir función suma:
// En caso de que la suma sea negativa, rechazar la promesa indicando “La calculadora sólo debe devolver valores
// positivos” (ejemplo: 10 + (-15) = -5 debe rechazarse)

// Definir función resta:
// En caso de que la resta sea negativa, rechazar la promesa indicando “La calculadora sólo debe devolver valores
// positivos” (ejemplo: 10 - 15 = -5 debe rechazarse)

// Definir una función multiplicación:
// Si el producto es negativo, rechazar la oferta indicando “La calculadora sólo puede devolver valores positivos”
// (ejemplo: 10 * (-15) = -150 debe rechazarse)

// Definir una función división:
// Si la división es negativa, rechazar la oferta indicando “La calculadora sólo puede devolver valores positivos”
// (ejemplo: 10 * (-5) = -2 debe rechazarse)

// Probar con then/catch y verificar el resultado con la función de ayuda

function suma(n1, n2) {
  return new Promise((res, rej) => {
    let verificarN1 = esNumero(n1);
    let verificarN2 = esNumero(n2);
    if (verificarN1.number && verificarN2.number) {
      let verificarSumMayorCero = verificarN1.number + verificarN2.number; // sumo `propiedades number de ambas verificaciones
      if (verificarSumMayorCero > 0) {
        return res(verificarSumMayorCero);
      } else {
        return rej({
          error: "La calculadora solo debe devolver valores positivos",
        });
      }
    } else {
      return rej({
        n1: verificarN1.message ?? verificarN1.number,
        n2: verificarN2.message ?? verificarN2.number,
      });
    }
  });
}

// Usando Sincronismo (.then / .catch)
// suma(5, 10)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
// suma(0, 10)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
// suma("hola", 10)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// Usando Asincronismo (Async/Await)
// calculos(5, 10, suma);
// calculos(0, 10, suma);
// calculos("chau", 1, suma);
// calculos(8, -10, suma);

function resta(n1, n2) {
  return new Promise((res, rej) => {
    let verificarN1 = esNumero(n1);
    let verificarN2 = esNumero(n2);
    if (verificarN1.number && verificarN2.number) {
      let resultado = verificarN1.number - verificarN2.number;
      if (resultado > 0) {
        return res(resultado);
      } else {
        return rej({
          error: "La calculadora solo debe devolver valores positivos",
        });
      }
    } else
      return rej({
        n1: verificarN1.message ?? verificarN1.number,
        n2: verificarN2.message ?? verificarN2.number,
      });
  });
}

// calculos(8, 10, resta);
// calculos("string", -10, resta);
// calculos(8, -10, resta);

// MULTIPLICACIÓN

function multiplicacion(n1, n2) {
  return new Promise((res, rej) => {
    let verificarN1 = esNumero(n1);
    let verificarN2 = esNumero(n2);
    if (verificarN1.number && verificarN2.number) {
      let resultado = verificarN1.number * verificarN2.number;
      if (resultado > 0) {
        return res(resultado);
      } else {
        return rej({
          error: "La calculadora solo debe devolver números positivos.",
        });
      }
    } else {
      return rej({
        n1: verificarN1.message ?? verificarN1.number,
        n2: verificarN2.message ?? verificarN2.number,
      });
    }
  });
}

// calculos(2, -3, multiplicacion);

// DIVISIÓN

function division(n1, n2) {
  return new Promise((res, rej) => {
    let verificarN1 = esNumero(n1);
    let verificarN2 = esNumero(n2);
    if (verificarN1.number && verificarN2.number) {
      if (verificarN2.number === 0) {
        return rej({ error: "No se puede dividir entre cero." });
      }
      let resultado = verificarN1.number / verificarN2.number;
      if (resultado > 0) {
        return res(resultado);
      } else {
        return rej({
          error: "La calculadora solo debe devolver números positivos.",
        });
      }
    } else {
      return rej({
        n1: verificarN1.message ?? verificarN1.number,
        n2: verificarN2.message ?? verificarN2.number,
      });
    }
  });
}

// calculos(6, 2, division);
// calculos("hola", 2, division);
// calculos(0, 2, division);
// calculos(2, 0, division);

function esNumero(num) {
  if (isNaN(num)) {
    let message = "Solo números";
    return { success: false, message };
  } else if (num === 0) {
    let message = "Operación innecesaria";
    return { success: false, message };
  } else {
    return { success: true, number: num };
  }
}

async function calculos(num1, num2, operacion) {
  try {
    let calculo = await operacion(num1, num2);
    console.log(calculo);
    return calculo;
  } catch (error) {
    console.log(error);
    return error;
  }
}
