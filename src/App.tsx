import { Header } from './components/Header/Header';
import { Post } from './components/Post/Post';
import { Sidebar } from './components/Sidebar/Sidebar';

import styles from './App.module.scss';

import './global.scss';

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://avatars.githubusercontent.com/u/63818742?v=4',
      name: 'Marcelo Fortes',
      role: 'Flutter and React Developer'
    },
    content: [
      { type: 'pharagraph', content: 'Fala galera' },
      { type: 'pharagraph', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe tenetur, corporis illum optio obcaecati maxime beatae voluptate commodi, ullam vitae repellat asperiores ut in quas a ipsam quod dicta fuga.' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2024-01-12 12:33:30'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://avatars.githubusercontent.com/u/68758215?v=4',
      name: 'Bruno Dias',
      role: 'Everything Developer'
    },
    content: [
      { type: 'pharagraph', content: 'Opa!' },
      { type: 'pharagraph', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe tenetur, corporis illum optio obcaecati maxime beatae voluptate commodi, ullam vitae repellat asperiores ut in quas a ipsam quod dicta fuga.' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2024-01-10 10:11:30'),
  },
]

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </div>
  )
}

