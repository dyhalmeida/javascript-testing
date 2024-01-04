/**
 * Algoritmo do fibonacci
 * Dado um input de valor 3
 * o resultado deve ser: 0,1,1
 * 
 * Dado um input 5
 * o resultado deve ser 0,1,1,2,3
 * 
 */

class Fibonacci {
    static *execute(input, current = 0, next = 1) {

        /**
         * Encerra a sequencia de Fibonnaci
         */
        if (input === 0) return

        /**
         * Retorna o valor
         */
        yield current

        /**
         * Delega a função mas não retorna valor
         */
        yield *this.execute(input - 1, next, current + next)
    }
}

module.exports = Fibonacci