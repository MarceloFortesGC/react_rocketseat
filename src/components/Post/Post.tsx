import styles from './Post.module.scss';

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { useState } from 'react';
import { Comment } from '../Comment/Comment';

export interface PostInterface {
    author: { avatarUrl: string; name: string; role: string; };
    content: { type: string; content: string; }[];
    publishedAt: Date;
    // comments: CommentProps[]
}

export function Post(props: PostInterface) {
    const author = props.author;
    const content = props.content;

    const publishedAtFormatted = format(
        props.publishedAt,
        "d 'de' LLLL 'às' HH:mm'h'",
        { locale: ptBR },
    );

    const pusblishedDateRelativeToNow = formatDistanceToNow(
        props.publishedAt,
        {
            locale: ptBR,
            addSuffix: true,
        },
    );

    const [comments, setComments] = useState([
        'Post supimpa',
    ]);

    const [newCommentText, setNewCommentText] = useState('');

    function _handleCreateNewComment() {
        // Confirma que o evento não é nulo
        if (!event) return;

        // Previne o comportamento padrão do submit do campo
        event?.preventDefault();

        setComments([...comments, newCommentText])
        setNewCommentText('');
    }

    function _handleNewCommentChange() {
        // Confirma que o evento não é nulo
        if (!event) return;

        // Resgata o valor que foi inserido no target
        const target = event.target as HTMLButtonElement;

        target.setCustomValidity('')
        setNewCommentText(target.value);
    }

    function _handleNewInvalidCommand() {
        if (!event) return;
        const target = event.target as HTMLButtonElement;

        target.setCustomValidity('Esse campo é obrigatório')
    }

    function deleteComment(commentToDelete: String) {
        const commentsWithoutDeletedOne = comments.filter((comment) => {
            return comment != commentToDelete;
        });

        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length == 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <img className={styles.avatar} src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedAtFormatted} dateTime={props.publishedAt.toISOString()} >
                    {pusblishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map((item) => {
                    if (item.type == 'pharagraph') {
                        return <p key={item.content}>{item.content}</p>
                    } else if (item.type == 'link') {
                        return <p key={item.content}><a href='#'>{item.content}</a></p>
                    }
                })}
            </div>

            <form
                onSubmit={_handleCreateNewComment}
                className={styles.commentForm}
            >
                <strong>Deixe seu feedback</strong>

                <textarea
                    name='comment'
                    placeholder='Deixe um comentário'
                    onChange={_handleNewCommentChange}
                    value={newCommentText}
                    onInvalid={_handleNewInvalidCommand}
                    required
                />

                <footer>
                    <button
                        type='submit'
                        disabled={isNewCommentEmpty}
                    >
                        Comentar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map((item) => {
                    return (
                        <Comment
                            key={item}
                            author={author}
                            content={item}
                            onDelete={deleteComment}
                        />
                    )
                })}
            </div>


        </article>
    )
}