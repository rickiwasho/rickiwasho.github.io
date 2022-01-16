import useSWR from 'swr'
import {
    Flex,
    Heading,
    Text,
    Link
} from '@chakra-ui/react'
import Container from '../components/Container'

export default function Projects() {
    const fetcher = (url) => fetch(url).then((r) => r.json())
    const { data, error } = useSWR('/api/github', fetcher)
    if (error) return <Container><Text>Failed to load projects!</Text></Container>
    if (!data) return <Container><Text>Loading...</Text></Container>
    return (
        <Container>
            <Heading as="h1">Projects ({data.repos.length})</Heading>
            <Flex flexDir="column">
                {
                    
                    data.repos.map((p) => (
                        <Link href={`/project/${p.name}`} key={p.name}>
                            <Flex flexDir="column" my={4} >
                                <Text fontWeight="bold">{p.name}</Text>
                                <Text>{p.description}</Text>
                                <Text>{p.stars} stars</Text>
                                <Text>{p.url}</Text>
                                <Text>{p.language}</Text>
                            </Flex>
                        </Link>
                    ))
                }
            </Flex>
        </Container>
    )
}