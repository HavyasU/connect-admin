import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { NoProfile } from "../../assets";
import { CustomButton, Loading, TextInput } from "../elementComponents";
import { baseUrlForUploads, ToastMessage } from "../../App";
import { CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import { fetchRequestCaller } from "../../utils/index";
import { Box } from "@chakra-ui/react";
const ReplyCard = ({ reply, handleLike }) => {
  return (
    <div className="w-full py-3">
      <div className="flex gap-3 items-center mb-1">
        <Link to={"/profile/" + reply?.userId?._id}>
          <img
            src={
              reply?.userId?.profileUrl
                ? `${baseUrlForUploads}/${reply?.userId?.profileUrl}`
                : NoProfile
            }
            alt={reply?.userId?.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>

        <div>
          <Link to={"/profile/" + reply?.userId?._id}>
            <p className="font-medium text-base text-ascent-1">
              {reply?.userId?.firstName} {reply?.userId?.lastName}
            </p>
          </Link>
          <span className="text-ascent-2 text-sm">
            {moment(reply?.createdAt).fromNow()}
          </span>
        </div>
      </div>

      <div className="ml-12">
        <p className="text-ascent-2 ">{reply?.comment}</p>
        <div className="mt-2 flex gap-6">
          <p className="flex gap-2  items-center text-base text-ascent-2 cursor-pointer">
            <BiSolidLike size={20} color="blue" />
            {reply?.likes?.length} Likes
          </p>
        </div>
      </div>
    </div>
  );
};

const PostCard = ({ post, fetchPosts }) => {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  const fetchComments = async () => {
    let res = await fetchRequestCaller({
      url: "/admin/comments/" + post?._id,
      method: "GET",
    });
    setComments(res.data);
  };
  const getComments = async () => {
    setReplyComments(0);
    fetchComments();
    setLoading(false);
  };
  const deletePost = async (id) => {
    let res = await fetchRequestCaller({
      url: "/admin/post/delete/" + id,
      method: "POST",
    });
    fetchPosts();
  };

  const [volumeHigh, setVolumeHigh] = useState(false);
  return (
    <div className="mb-2 bg-[#1a1919]  p-4  rounded-xl">
      <div className="flex gap-3 items-center mb-3 ">
        <Link to={"/profile/" + post?.userId?._id}>
          <img
            src={
              post?.userId?.profileUrl
                ? `${baseUrlForUploads}/${post?.userId?.profileUrl}`
                : NoProfile
            }
            alt={post?.userId?.firstName}
            className="w-14 h-12 object-cover rounded-full"
          />
        </Link>

        <div className="w-full flex justify-between ">
          <div className="">
            <Link to={"/profile/" + post?.userId?._id}>
              <p
                title={`${post?.userId?.firstName} ${post?.userId?.lastName}`}
                className="font-medium text-lg text-ascent-1 max-sm:text-[15px] line-clamp-1 "
              >
                {post?.userId?.firstName} {post?.userId?.lastName}
              </p>
            </Link>
            <span className="text-ascent-2">{post?.userId?.location}</span>
          </div>

          <span className="text-ascent-2 max-sm:text-xs">
            {moment(post?.createdAt ?? "2023-05-25").fromNow()}
          </span>
        </div>
      </div>

      <div>
        <p className="text-ascent-2 pl-2">
          {showAll === post?._id
            ? post?.description
            : post?.description.slice(0, 300)}

          {post?.description?.length > 301 &&
            (showAll === post?._id ? (
              <span
                className="text-blue ml-2 font-mediu cursor-pointer"
                onClick={() => setShowAll(0)}
              >
                Show Less
              </span>
            ) : (
              <span
                className="text-blue ml-2 font-medium cursor-pointer"
                onClick={() => setShowAll(post?._id)}
              >
                Show More
              </span>
            ))}
        </p>

        {post?.type === "image" && post?.media && (
          <Box className="w-full h-full rounded-lg overflow-hidden">
            <img
              src={`${baseUrlForUploads}/${post?.media}`}
              alt="post image"
              className="w-full md:max-h-96   md:object-contain  mt-2 rounded-lg "
            />
          </Box>
        )}
        {post?.type === "video" && post?.media && (
          <div className="relative">
            <video
              muted={!volumeHigh}
              autoPlay
              loop
              src={`${baseUrlForUploads}/${post?.media}`}
              alt="post image"
              className="w-full mt-2 rounded-lg md:h-[30rem]"
            />
            {volumeHigh ? (
              <CiVolumeHigh
                size={25}
                onClick={() => setVolumeHigh(!volumeHigh)}
                className="absolute bottom-3 right-3 text-white"
              />
            ) : (
              <CiVolumeMute
                size={25}
                onClick={() => setVolumeHigh(!volumeHigh)}
                className="absolute bottom-3 right-3 text-white"
              />
            )}
          </div>
        )}
      </div>

      <div
        className="mt-4 flex justify-between items-center px-3  py-2 text-ascent-2
      text-base border-t border-[#66666645]"
      >
        <p className="flex gap-2 items-center text-base cursor-pointer">
          <BiSolidLike size={20} color="blue" />
          {post?.likes?.length} <span className="max-sm:hidden">Likes</span>
        </p>

        <p
          className="flex gap-2 items-center text-base cursor-pointer"
          onClick={() => {
            setShowComments(showComments === post._id ? null : post._id);
            getComments(post?._id);
          }}
        >
          <BiComment size={20} />
          {post?.comments?.length}{" "}
          <span className="max-sm:hidden">Comments</span>
        </p>

        {
          <div
            className="flex gap-1 items-center text-base text-ascent-1 cursor-pointer"
            onClick={() => deletePost(post?._id)}
          >
            <MdOutlineDeleteOutline size={20} />
            <span
              className="
            max-sm:hidden"
            >
              Delete
            </span>
          </div>
        }
      </div>

      {/* COMMENTS */}
      {showComments === post?._id && (
        <div className="w-full mt-4 border-t border-[#66666645] pt-4 ">
          {loading ? (
            <Loading />
          ) : comments?.length > 0 ? (
            comments?.map((comment) => (
              <div className="w-full py-2" key={comment?._id}>
                <div className="flex gap-3 items-center mb-1">
                  <Link to={"/profile/" + comment?.userId?._id}>
                    <img
                      src={
                        comment?.userId?.profileUrl
                          ? `${baseUrlForUploads}/${comment?.userId?.profileUrl}`
                          : NoProfile
                      }
                      alt={comment?.userId?.firstName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Link>
                  <div>
                    <Link to={"/profile/" + comment?.userId?._id}>
                      <p className="font-medium text-base text-ascent-1">
                        {comment?.userId?.firstName} {comment?.userId?.lastName}
                      </p>
                    </Link>
                    <span className="text-ascent-2 text-sm">
                      {moment(comment?.createdAt ?? "2023-05-25").fromNow()}
                    </span>
                  </div>
                </div>

                <div className="ml-12">
                  <p className="text-ascent-2">{comment?.comment}</p>

                  <div className="mt-2 flex gap-6">
                    <p
                      onClick={() => handleCommentLike(comment._id)}
                      className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer"
                    >
                      <BiSolidLike size={20} color="blue" />
                      {comment?.likes?.length} Likes
                    </p>
                  </div>
                </div>

                {/* REPLIES */}

                <div className="py-2 px-8 mt-6">
                  {comment?.replies?.length > 0 && (
                    <p
                      className="text-base text-ascent-1 cursor-pointer "
                      onClick={() =>
                        setShowReply(
                          showReply === comment?.replies?._id
                            ? 0
                            : comment?.replies?._id
                        )
                      }
                    >
                      Replies ({comment?.replies?.length})
                    </p>
                  )}

                  {showReply === comment?.replies?._id &&
                    comment?.replies?.map((reply) => (
                      <ReplyCard
                        reply={reply}
                        key={reply?._id}
                        handleLike={() =>
                          handleCommentLike(comment?._id, reply?._id)
                        }
                      />
                    ))}
                </div>
              </div>
            ))
          ) : (
            <span className="flex text-sm py-4 text-ascent-2 text-center">
              No Comments, be first to comment
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
