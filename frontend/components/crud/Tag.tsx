import {useState, useEffect, FunctionComponent, ChangeEvent, MouseEvent} from 'react';
import {getCookie} from "../../actions/auth";
import {create, getTags, removeTag} from '../../actions/tag';
import {BiAddToQueue} from 'react-icons/bi';
import {Tag} from '../../actions/tag';
import ReactTooltip from "react-tooltip";

interface InitialState {
    name: string;
    tags: Tag[] | undefined;
    reload: boolean;
}

const Tag: FunctionComponent = (): JSX.Element => {
    const [values, setValues] = useState<InitialState>({
        name: '',
        tags: [],
        reload: false
    });

    const {name, tags, reload} = values;

    useEffect(() => {
        loadCategories();
    }, [reload]);

    const loadCategories = async () => {
        const tags = await getTags()
        setValues({...values, tags});
    };

    const showTags = () => {
        return tags?.map((tag, index) => {
            return (
                <>
                    <ReactTooltip place="top" type="dark" effect="float"/>
                    <button onDoubleClick={() => deleteConfirm(tag.slug)} key={index} className="btn-secondary-tag"
                            data-tip="Kliknij dwa razy aby usunąć">{tag.name}</button>
                </>
            )
        });
    };

    const deleteConfirm = async (slug: string) => {
        let answer = window.confirm('Czy na pewno chcesz usunąć ten tag?');
        if (answer) {
            await deleteTag(slug);
        }
    };

    const deleteTag = async (slug: string) => {
        await removeTag(slug, token);
        setValues({...values, reload: !reload});
    };

    const token = getCookie('token');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, name: e.target.value})
    };

    const handleClickSubmit = async (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        await create(name, token);
        setValues({...values, name: '', reload: !reload});
    };

    const newTagForm = () => (
        <form onSubmit={handleClickSubmit} className="category-tag-form">
            <label>Nazwa:</label>
            <input type="text" onChange={handleChange} value={name} className="category-tag-input"/>
            <button type="submit" className="btn-secondary-tag">
                <BiAddToQueue/> {" "} Dodaj
            </button>
        </form>
    )

    return (
        <div className="tag-wrapper">
            <h3 className="tag-header">Tagi:</h3>
            {newTagForm()}
            <div className="tags-container">
                {showTags()}
            </div>
        </div>
    )
};

export default Tag;