import styles from './Avatar.module.scss';

interface AvatarInterface {
    user: { avatarUrl: string; name: string; role: string };
    showUserInfo: boolean;
    aditionalComponent: JSX.Element;
}

export function Avatar(props: AvatarInterface) {
    const user = props.user;

    return (
        <header>
            <div className={styles.author}>
                <img className={styles.avatarImg} src={user.avatarUrl} />
                {props.showUserInfo && (
                    <div className={styles.authorInfo}>
                        <strong>{user.name}</strong>
                        <span>{user.role}</span>
                    </div>
                )}
            </div>

            {props.aditionalComponent}
        </header>
    )
}