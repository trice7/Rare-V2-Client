import Link from "next/link";

export default function PostCard({post}) {
    return (
        <div className="post-card">
            <img className="post-card-img" src="{post.image_url}" />
            <Link passHref href={`posts/${post.id}`}><h3 className='post-card-title'>post.title</h3></Link>
            <p className="post-card-category">post.category.label</p>
            <p className="post-card-author">post.user.id</p>
        </div>
    )
}