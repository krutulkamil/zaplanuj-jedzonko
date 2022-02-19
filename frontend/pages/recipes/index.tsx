import Link from 'next/link';
import Layout from '../../components/Layout';
import {useState} from 'react';
import {listRecipesWithCategoriesAndTags} from "../../actions/recipe";
import {AllRecipesCategoriesTags, Category, Recipe, Tag} from "../../types";
import {NextPage} from "next";
import Card from "../../components/recipe/Card";

interface PageProps {
    recipes?: Recipe[];
    categories?: Category[];
    tags?: Tag[];
    totalRecipes?: number;
    recipesLimit: number;
    recipesSkip: number;
}

const Recipes: NextPage<PageProps>
    = ({
           recipes,
           categories,
           tags,
           totalRecipes,
           recipesLimit,
           recipesSkip
       }): JSX.Element => {
    const [limit, setLimit] = useState<number>(recipesLimit);
    const [skip, setSkip] = useState<number>(recipesSkip);
    const [size, setSize] = useState<number | undefined>(totalRecipes);
    const [loadedRecipes, setLoadedRecipes] = useState([] as Recipe[]);

    const loadMore = async () => {
        let toSkip: number = skip + limit;
        const data = await listRecipesWithCategoriesAndTags(toSkip, limit);
        if (data) {
            setLoadedRecipes([...loadedRecipes, ...data.recipes]);
            setSize(data.size);
            setSkip(toSkip);
        }
    };

    const loadMoreButton = () => {
        if (size) {
            return (
                size > 0 && size >= limit && (
                    <button onClick={loadMore} className="btn-load-more">Więcej przepisów!</button>
                )
            );
        }
    };

    const showLoadedRecipes = () => {
        return loadedRecipes && loadedRecipes.map((recipe, idx) => (
            <article key={idx} className="card-wrapper">
                <Card recipe={recipe}/>
            </article>
        ));
    };

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
                    {showLoadedRecipes()}
                </div>
                <div className="load-more-container">
                    {loadMoreButton()}
                </div>
            </main>
        </Layout>
    );
};

Recipes.getInitialProps = async (): Promise<PageProps> => {
    let skip = 0;
    let limit = 6;
    const data: AllRecipesCategoriesTags | undefined = await listRecipesWithCategoriesAndTags(skip, limit);

    return {
        recipes: data?.recipes,
        categories: data?.categories,
        tags: data?.tags,
        totalRecipes: data?.size,
        recipesLimit: limit,
        recipesSkip: skip
    }
};

export default Recipes;