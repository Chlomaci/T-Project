import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface IProduct {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string,
    quantity: number,
    totalPrice: number,
}

export interface ISubscription{
    username: string,
    email: string,
    subscription: boolean,
}

export const fakestoreApi = createApi({
    reducerPath: 'fakestoreApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'https://fakestoreapi.com/',
        }
    ),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], number>({
            query: (limit) => `products?limit=${limit}`,
            transformResponse: (response: IProduct[]) => {
                return response.map((product) => ({
                    ...product,
                    price: Math.ceil(product.price),
                    quantity: 0,
                    totalSum: 0,
                }))
            }
        }),
        addUser: builder.mutation<Object, ISubscription>({
            query: (subscrData) => ({
                url: `users`,
                method: 'POST',
                body: subscrData,
            }),
        })
    }),
})

export const { useGetProductsQuery, useAddUserMutation } = fakestoreApi