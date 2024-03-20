/* eslint-disable react/prop-types */

import { Image } from 'react-bootstrap';
import { PostJson } from '../json/json';
import LogoButtons from './PostLogoBtn';

const PostPage = () => {
  const data = PostJson.map((post) => (
    <div key={post.id}>
      <h2>{post.title}</h2>
      <p>{post.contentIntro}</p>
      <small className="text-muted">
        Date: {post.date} | Updated: {post.updatedDate}
      </small>
<LogoButtons/>
      
      <div style={{ width: '100%', maxWidth: '100%', textAlign: 'center' }}>
        {post.imageTop && (
          <Image
            src={post.imageTop}
            alt="Post Image"
            fluid
            className="my-3"
            style={{ aspectRatio: '16/9', objectFit: 'fill' }}
          />
        )}
        <p style={{ width: '100%', maxWidth: '100%', textAlign: 'justify' }}>
          {post.contentBottom}
        </p>
      </div>
    </div>
  ));

  return <>{data}</>;
};

export default PostPage;
