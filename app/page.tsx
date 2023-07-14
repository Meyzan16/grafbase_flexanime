import React from "react";
import { ProjectInterface } from "@/common.types";
import { fetchAllProjects } from "@/lib/actions";
import ProjectCard from "@/components/ProjectCard";

type ProjectsSearch = {
    projectSearch: {
        edges: {node: ProjectInterface}[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string;
        }
    }
}

const Home = async () => {

    // const [getall, setall] = useState([]);


    // const getAll = async () => {

            const data = await fetchAllProjects() as ProjectsSearch;

            const projectsToDisplay = data?.projectSearch?.edges || [];
        
            if(projectsToDisplay.length === 0) {
                
                return (
                    <section className="flexStart flex-col paddings">
                        Categories
        
                        <p className="no-result-text text-center">
                            No anime collection found, go create some first.
                        </p>
        
                    </section>
                )
        
            }

            console.log(projectsToDisplay);

    //         setall(data);

    // }


    // useEffect(()=> {
    //     getAll();
    // },[getAll]);



    return (
        <section className="flex-start flex-col paddings mb-16">
            Categories

            <section className="projects-grid">
                {
                    projectsToDisplay.map(
                        ({node}: {node: ProjectInterface}) => 
                    (
                        <ProjectCard 
                            key={node?.id}
                            id={node?.id}
                            image={node?.image}
                            genre={node?.genre}
                            episode={node?.episode}
                            title={node?.title}
                            name={node?.createdBy?.name}
                            avatarUrl={node?.createdBy?.avatarUrl}
                            userId={node?.createdBy?.id}

                        />
                    )
                    )
                }

            </section>

        </section>
    )
}

export default Home;
