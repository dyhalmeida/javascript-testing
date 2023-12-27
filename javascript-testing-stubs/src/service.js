class Service {
    static async makeRequest(url) {
        return (await fetch(url)).json()
    }

    static async getCharacterStarWars(url) {
        const data = await this.makeRequest(url)
        return {
            name: data.name,
            gender: data.gender,
            appearedInHowManyFilms: data.films.length,
        }
    }
}

module.exports = Service