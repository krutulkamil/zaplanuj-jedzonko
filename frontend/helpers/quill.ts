import dynamic from "next/dynamic";
const Quill = dynamic(() => import('react-quill'), {ssr: false});

const toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    ['clean'],
    ['image']
];

export const QuillModules = {
    toolbar: {
        container: toolbarOptions,
        handlers: {
            image: imageHandler
        }
    }
}

async function imageHandler(this: {
    quill: any;
    image: () => void; }) {
    const range = this.quill.getSelection();
    const value = prompt('Podaj adres URL obrazu');
    if (value){
        // @ts-ignore
        this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
    }
}

export const QuillFormats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];