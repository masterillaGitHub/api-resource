import {expect, test} from 'vitest'
import ApiResource from './index.js'

function initApi() {
    return new ApiResource()
        .baseUrl('https://jsonplaceholder.typicode.com')
        .resource('posts')
}

function defaultResponseData() {
    return {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }
}

test('get', async () => {
    const api = initApi()

    const response = await api.get()

    expect(response.status).toBe(200)
    expect(response.data[0]).toMatchObject(defaultResponseData())
})

test('find', async () => {
    const api = initApi()

    const response = await api.find(1)

    expect(response.status).toBe(200)
    expect(response.data).toMatchObject(defaultResponseData())
})

test('store', async () => {
    const api = initApi()

    const data = {
        "title": "foo",
        "body": "bar",
        "userId": 1
    }
    const responseData = {
        "title": "foo",
        "body": "bar",
        "userId": 1,
        "id": 101
    }

    const response = await api.store(data)

    expect(response.status).toBe(201)
    expect(response.data).toMatchObject(responseData)
})

test('update', async () => {
    const api = initApi()

    const data = {
        "title": "testing",
    }
    const responseData = {
        "userId": 1,
        "id": 1,
        "title": "testing",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }

    const response = await api.update(1, data)

    expect(response.status).toBe(200)
    expect(response.data).toMatchObject(responseData)
})

test('destroy', async () => {
    const api = initApi()

    const responseData = {}

    const response = await api.destroy(1)


    expect(response.status).toBe(200)
    expect(response.data).toMatchObject(responseData)
})
