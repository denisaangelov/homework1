import { GET_POSTS, NEW_POST, EDIT_POST, DELETE_POST, CHANGE_STATUS, FILTER_POSTS } from '../actions/list';

const tempdb = [
    {
        id: 0,
        title: 'Заглавие 0',
        author: 'Автор 0',
        text: 'Текст 0Текст 0javascript react bootstrapjavascript react bootstrapjavascript react bootstrapjavascript react bootstrapjavascript react bootstrapjavascript react bootstrapjavascript react bootstrapjavascript react bootstrapjavascript react bootstrapjavascript react bootstrapjavascript react bootstrapjavascript react bootstrapjavascript react bootstrapjavascript react bootstrapjavascript react bootstrapjavascript react bootstrapjavascript react bootstrap',
        tags: 'javascript react bootstrap',
        status: 'Статус 0',
        date: new Date(1991, 5, 12)
    }, {
        id: 1,
        title: 'Title 1',
        author: 'Author 1',
        text: 'Txt 1',
        tags: 'javascript react bootstrap',
        status: 'Status 1',
        date: new Date(1992, 5, 12)
    }, {
        id: 2,
        title: 'Title 2',
        author: 'Author 2',
        text: 'Txt 2',
        tags: 'javascript react bootstrap',
        status: 'Status 2',
        date: new Date(1992, 5, 12)
    }, {
        id: 3,
        title: 'action.data.text',
        author: 'action.data.author',
        text: 'action.data.text',
        tags: 'action.data.tags',
        status: 'Inactive',
        date: new Date(1888, 5, 12)
    }, {
        id: 4,
        title: 'action.data.text',
        author: 'action.data.author',
        text: 'action.data.text',
        tags: 'action.data.tags',
        status: 'Inactive',
        date: new Date(2000, 5, 12)
    }, {
        id: 5,
        title: 'action.data.text',
        author: 'action.data.author',
        text: 'action.data.text',
        tags: 'action.data.tags',
        status: 'Inactive',
        date: new Date(2001, 5, 12)
    }, {
        id: 6,
        title: 'action.data.text',
        author: 'action.data.author',
        text: 'action.data.text',
        tags: 'action.data.tags',
        status: 'Inactive',
        date: new Date(2015, 5, 12)
    }, {
        id: 7,
        title: 'action.data.text',
        author: 'action.data.author',
        text: 'action.data.text',
        tags: 'action.data.tags',
        status: 'Inactive',
        date: new Date(2222, 5, 12)
    }, {
        id: 8,
        title: 'action.data.text',
        author: 'action.data.author',
        text: 'action.data.text',
        tags: 'action.data.tags',
        status: 'Inactive',
        date: new Date(1999, 5, 12)
    }, {
        id: 9,
        title: 'action.data.text',
        author: 'action.data.author',
        text: 'action.data.text',
        tags: 'action.data.tags',
        status: 'Inactive',
        date: new Date(1992, 5, 12)
    }, {
        id: 10,
        title: 'action.data.text',
        author: 'action.data.author',
        text: 'action.data.text',
        tags: 'action.data.tags',
        status: 'Inactive',
        date: new Date(1992, 5, 12)
    }, {
        id: 11,
        title: 'action.data.text',
        author: 'action.data.author',
        text: 'action.data.text',
        tags: 'action.data.tags',
        status: 'Active',
        date: new Date(1992, 5, 12)
    }, {
        id: 12,
        title: 'action.data.text',
        author: 'action.data.author',
        text: 'action.data.text',
        tags: 'action.data.tags',
        status: 'Active',
        date: new Date(1992, 5, 12)
    }, {
        id: 13,
        title: 'action.data.text',
        author: 'action.data.author',
        text: 'action.data.text',
        tags: 'action.data.tags',
        status: 'Active',
        date: new Date(1992, 5, 12)
    }, {
        id: 14,
        title: '14',
        author: 'action.data.author',
        text: 'action.data.text',
        tags: 'action.data.tags',
        status: 'Active',
        date: new Date(1992, 5, 12)
    }, {
        id: 15,
        title: '15',
        author: 'action.data.author',
        text: 'action.data.text',
        tags: 'action.data.tags',
        status: 'Active',
        date: new Date(1992, 5, 12)
    }, {
        id: 16,
        title: '16',
        author: 'action.data.author',
        text: 'action.data.text',
        tags: 'action.data.tags',
        status: 'Active',
        date: new Date(1992, 5, 12)
    }
]

const postReducer = (state = {}, action) => {

    console.log(action.type);
    switch (action.type) {
        case NEW_POST:
            return {
                id: action.id,
                title: action.data.title,
                author: action.data.author,
                text: action.data.text,
                tags: action.data.tags,
                status: action.data.status,
                date: action.data.date
            };

        case EDIT_POST:
            if (state.id !== action.post.id) {
                return state;
            }
            return Object.assign({}, { ...action.post });

        case CHANGE_STATUS:
            if (state.id !== action.id) {
                return state;
            }
            return Object.assign({}, state, { status: action.status });
        default: // GET_POSTS
            return state;
    }
};

const postsReducer = (state = tempdb, action) => {
    switch (action.type) {
        case NEW_POST:
            let st = [
                ...state,
                postReducer(undefined, action)
            ];
            console.log(st);
            return [
                ...state,
                postReducer(undefined, action)
            ];

        case EDIT_POST:
            return state.map(post =>
                postReducer(post, action)
            );

        case CHANGE_STATUS:
            return state.map(post =>
                postReducer(post, action)
            );

        case DELETE_POST:
            return state.filter(post =>
                post.id !== action.id
            );

        default:
            return state;
    }
};

export default postsReducer;