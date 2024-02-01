import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.scss';
import { Avatar } from '../Avatar/Avatar';
import { useState } from 'react';

export interface CommentProps {
    author: { avatarUrl: string; name: string; role: string };
    content: String;
    onDelete: Function;
}

export function Comment(props: CommentProps) {
    const author = props.author;

    const [likeCount, setLikeCount] = useState(0);

    function _handleDeleteComment() {
        props.onDelete(props.content)
    }

    function _handleLikeComment() {
        /// Está sendo atualizado dessa forma para poder sempre acessar o valor mais recente da 
        /// variável "likeCount".
        setLikeCount((state) => {
            return state + 1;
        })
    }

    var commentAction =
        <div className={styles.content}>
            <header>
                <strong>{author.name}</strong>
                <div className={styles.content}>
                    <p>{props.content}</p>
                </div>
            </header>
            <button title='Deletar Comentário' onClick={_handleDeleteComment}>
                <Trash size={20} />
            </button>
        </div>

    return (
        <article className={styles.post}>
            <Avatar
                user={props.author}
                aditionalComponent={commentAction}
                showUserInfo={false}
            />
            <button className={styles.likeAction} onClick={_handleLikeComment}>
                <ThumbsUp size={20} />
                Aplaudir <span>{likeCount}</span>
            </button>
        </article>
    )
}