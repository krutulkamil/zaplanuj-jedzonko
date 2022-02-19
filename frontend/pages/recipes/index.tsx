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
            <article key={idx} className="card-wrapper">
                <Card recipe={recipe}/>
            </article>
        ));
    }

    const showAllCategories = () => {
        return categories && categories.map((category, idx) => (
            <Link href={`/categories/${category.slug}`} key={idx}>
                <a className="btn-secondary-category">{category.name}</a>
            </Link>
        ));
    }

    const showAllTags = () => {
        return tags && tags.map((tag, idx) => (
            <Link href={`/categories/${tag.slug}`} key={idx}>
                <a className="btn-secondary-tag">{tag.name}</a>
            </Link>
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
                        <div className="categories-tags-container">
                            {showAllCategories()}
                            {showAllTags()}
                        </div>
                        <hr/>
                    </section>
                </div>
                <div className="card-container">
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