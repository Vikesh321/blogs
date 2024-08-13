import React, { useState } from 'react'
import { useEffect } from 'react'
import appwriteService from "../appwrite/configer"
import { Container, PostCard } from '../components'
import authService from '../appwrite/auth'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState([])
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)


            }
        })
    }, [])

    useEffect(() => {

        authService.getCurrentUser()
            .then((userData) => {
                setUser(userData)
            })


    }, [])

    if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1>{user?.name}</h1>
                            <h1>{user?.email}</h1>
                            <h1>{user?.password
                            }</h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts.map((post) => (

                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>

                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default Home
