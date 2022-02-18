import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {useState} from 'react';
import {listRecipesWithCategoriesAndTags} from "../../actions/recipe";
import {AllRecipesCategoriesTags, Category, Recipe, Tag} from "../../types";
import {NextPage} from "next";
import Card from "../../components/recipe/Card";

interface PageProps {
    recipes?: Recipe[]
    categories?: Category[]
    tags?: Tag[]
    size?: number
}

const Recipes: NextPage<PageProps> = ({recipes, categories, tags, size}): JSX.Element => {

    const showAllRecipes = () => {
        return recipes && recipes.map((recipe, idx) => (
            <article key={idx} style={{margin: "10px"}}>
                <Card recipe={recipe}/>
            </article>
        ));
    }

    return (
        <Layout title="Przepisy">
            <main>
                <div>
                    <header>
                        <h1>Moje przepisy</h1>
                    </header>
                    <section>
                        <p>pokaż kategorie i tagi</p>
                        <hr/>
                    </section>
                </div>
                <div style={{display: 'flex', flexWrap: "wrap", justifyContent: "center"}}>
                    {showAllRecipes()}
                </div>
            </main>
        </Layout>
    );
};

Recipes.getInitialProps = async (): Promise<PageProps> => {
    const data: AllRecipesCategoriesTags | undefined = await listRecipesWithCategoriesAndTags();

    return {
        recipes: data?.recipes,
        categories: data?.categories,
        tags: data?.tags,
        size: data?.size
    }
};

export default Recipes;