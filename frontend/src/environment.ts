interface Environment {
    name: string;
    baseUrl: string;
}

const development: Environment = {
    name: 'development',
    baseUrl: 'http://localhost:35000'
}

const production: Environment = {
    name: 'production',
    baseUrl: 'https://api.bookolog.pw'
}

const test: Environment = {
    name: 'test',
    baseUrl: 'https://testurl:5000'
}

export default function env(): Environment {
    if (process.env.NODE_ENV === development.name) {
        return development;
    } else if (process.env.NODE_ENV === production.name) {
        return production;
    } else if (process.env.NODE_ENV === test.name) {
        return test;
    } else return null!;
}
