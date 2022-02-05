import {useState, useEffect, FunctionComponent, ChangeEvent, MouseEvent} from 'react';
import {getCookie} from "../../actions/auth";
import {create, getCategories, removeCategory} from '../../actions/category';
import {BiAddToQueue} from 'react-icons/bi';
import {Category} from '../../actions/category';
import ReactTooltip from "react-tooltip";

interface InitialState {
    name: string;
    categories: Category[] | undefined;
    reload: boolean;
}

const Category: FunctionComponent = (): JSX.Element => {
    const [values, setValues] = useState<InitialState>({
        name: '',
        categories: [],
        reload: false
    });

    const {name, categories, reload} = values;

    useEffect(() => {
        loadCategories();
    }, [reload]);

    const loadCategories = async () => {
        const categories = await getCategories()
        console.log(categories);
        setValues({...values, categories});
    };

    const showCategories = () => {
        return categories?.map((category, index) => {
            return (
                <>
                    <ReactTooltip place="top" type="info" effect="float"/>
                    <button onDoubleClick={() => deleteConfirm(category.slug)} key={index} className="btn-secondary"
                            data-tip="Kliknij dwa razy aby usunąć">{category.name}</button>
                </>
            )
        });
    };

    const deleteConfirm = async (slug: string) => {
        let answer = window.confirm('Czy na pewno chcesz usunąć tą kategorię?');
        if (answer) {
            await deleteCategory(slug);
        }
    };

    const deleteCategory = async (slug: string) => {
        await removeCategory(slug, token);
        setValues({...values, reload: !reload});
    };

    const token = getCookie('token');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, name: e.target.value})
    };

    const handleClickSubmit = async (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        await create(name, token);
        setValues({...values, reload: !reload});
    };

    const newCategoryForm = () => (
        <form onSubmit={handleClickSubmit} style={{display: 'flex', flexDirection: 'column', maxWidth: "40%"}}>
            <label>Nazwa:</label>
            <input type="text" onChange={handleChange} value={name} style={{padding: '10px', marginBottom: '10px'}}/>
            <button type="submit" className="btn-secondary" style={{margin: 0}}>
                <BiAddToQueue/> {" "} Dodaj
            </button>
        </form>
    )

    return (
        <>
            <h2>Zarządzaj kategoriami / tagami</h2>
            <h3 style={{marginTop: '30px'}}>Kategorie:</h3>
            {newCategoryForm()}
            <div style={{marginTop: '20px'}}>
                {showCategories()}
            </div>
        </>
    )
};

export default Category;