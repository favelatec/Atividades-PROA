import { useState, useEffect } from "react";
import { faker } from '@faker-js/faker';

const abortController = new AbortController()

function getRandomNumberBetween(Min, Max) {
    return Math.floor(Math.random() * (Max - Min + 1) + Min)
}

function generateRandomNames() {
    return [faker.name.firstName(), faker.name.firstName()]
}

const ReasonsList = [
    "Novo(a) no Instagram", "Seguido(a) por %n e %n", "Sugestões para você", "Segue você"
]


export default function GenerateRecommendedFollowers() {
    const [RecommendationUsers, setRecommendation] = useState([])
    const [loadingState, setLoadingState] = useState(true)

    useEffect(() => {
        fetch("/api/user-generator", {
            signal: abortController.signal,
            method: "POST",
            body: JSON.stringify({ ammount: 5 })
        })
            .then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then((data) => {
                abortController.abort();
                setRecommendation(() => {
                    return []
                })
                for (let index = 0; index < data.results.length; index += 1) {
                    let userData = data.results[index];
                    let randomIndex = getRandomNumberBetween(0, 3);
                    let Reason = ReasonsList[randomIndex]
                    if (randomIndex == 1) {
                        let namesArray = generateRandomNames();
                        Reason = Reason.replace("%n", namesArray[0])
                        Reason = Reason.replace("%n", namesArray[1])
                    }
                    let user = { name: userData.name.first, image: userData.picture.large, reason: Reason };
                    setRecommendation((prev) => {
                        return [...prev, user]
                    })
                }

                setLoadingState(false)
            })
    }, [])

    return [RecommendationUsers, loadingState]
}