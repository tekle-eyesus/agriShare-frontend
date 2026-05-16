import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ImageIcon, X as CloseIcon } from "lucide-react";
import { modalVariants, overlayVariants } from "../../../utils/motionVariants";
import Modal from "../Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { updateFormSchema } from "../../../validations/updateSchema";
import { useMutation } from "@tanstack/react-query";
import { useAPI } from "../../../hook/useApi";

export function PostUpdateModalprev({ isOpen, onClose, onPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = () => {
    onPost({ title, body, images });
    onClose();
    setTitle("");
    setBody("");
    setImages([]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="z-50 fixed inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="top-1/2 left-1/2 z-50 fixed bg-base-100 shadow-2xl rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2"
          >
            <div className="top-0 sticky flex justify-between items-center bg-base-100 p-6 border-base-200 border-b">
              <h2 className="font-bold text-2xl">Post New Update</h2>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-circle"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="form-control">
                <label className="label">
                  <span className="font-medium label-text">Update Title *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Harvest Progress Update"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="font-medium label-text">Update Body *</span>
                </label>
                <textarea
                  placeholder="Share your update with investors..."
                  rows={6}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="resize-none textarea textarea-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="font-medium label-text">
                    Images (optional, up to 3)
                  </span>
                </label>
                <div className="p-8 border-2 border-base-300 hover:border-primary border-dashed rounded-lg text-center transition-colors cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    id="update-images"
                    multiple
                    accept=".jpg,.png"
                    max={3}
                    onChange={(e) => setImages(Array.from(e.target.files))}
                  />
                  <label htmlFor="update-images" className="cursor-pointer">
                    <ImageIcon className="mx-auto mb-3 w-12 h-12 text-base-content/40" />
                    <p className="text-sm text-base-content/70">
                      Click to upload images
                    </p>
                    <p className="mt-1 text-xs text-base-content/50">
                      JPG or PNG, up to 3 images
                    </p>
                  </label>
                </div>
                {images.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {images.map((img, idx) => (
                      <div key={idx} className="gap-1 badge badge-primary">
                        {img.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bottom-0 sticky flex justify-end gap-3 bg-base-200 p-6 border-base-300 border-t">
              <button onClick={onClose} className="btn btn-ghost">
                Cancel
              </button>
              <button onClick={handleSubmit} className="btn btn-primary">
                Post Update
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function PostUpdateModal({ open, onClose, listingId, onSuccess }) {
  const [imagePreviews, setImagePreviews] = useState([]);
  const { farmer } = useAPI();
  const mutate = useMutation({
    mutationFn: (data) => farmer.createListingUpdate({ listingId, data }),
    onSuccess: () => {
      onSuccess();
      onClose();
      reset();
      setImagePreviews([]);
      toast.success("Update posted to investors");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to post update");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      title: "",
      body: "",
      images: [],
    },
  });
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    setValue("images", files);
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setValue(
      "images",
      imagePreviews.filter((_, i) => i !== index),
    );
  };

  const onSubmit = (data) => {
    console.log("Form data:", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", data.body);
    data.images &&
      data.images.forEach((image) => formData.append("images", image));

    mutate.mutate(formData);
  };

  const bodyValue = watch("body") || "";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Post New Update"
      size="md"
      footer={
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={mutate.isPending}
            className="btn btn-ghost btn-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="btn btn-primary btn-sm"
            disabled={mutate.isPending}
          >
            {mutate.isPending ? "Posting..." : "Post Update"}
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
        <div>
          <label className="font-semibold label-text">Title</label>
          <input
            {...register("title")}
            maxLength={100}
            className="mt-1.5 rounded-xl w-full input input-bordered"
            placeholder="What's new on the farm?"
          />
          {errors.title && (
            <p className="mt-1 text-error text-xs">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="font-semibold label-text">Body</label>
          <textarea
            {...register("body")}
            maxLength={2000}
            rows={5}
            className="mt-1.5 rounded-xl w-full textarea textarea-bordered"
            placeholder="Share progress, photos and milestones with investors…"
          />
          <div className="flex justify-between mt-1">
            <p className="text-[11px] text-muted-foreground">
              {errors.body && (
                <span className="text-error">{errors.body.message}</span>
              )}
            </p>
            <p className="text-[11px] text-muted-foreground text-right">
              {bodyValue.length}/2000
            </p>
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="font-medium label-text">
              Images (optional, up to 3)
            </span>
          </label>
          <div className="p-8 border-2 border-base-300 hover:border-primary border-dashed rounded-lg text-center transition-colors cursor-pointer">
            <input
              type="file"
              className="hidden"
              id="update-images"
              multiple
              accept=".jpg,.png,.jpeg"
              max={3}
              {...register("images")}
              onChange={handleImageChange}
            />
            <label htmlFor="update-images" className="cursor-pointer">
              <ImageIcon className="mx-auto mb-3 w-12 h-12 text-base-content/40" />
              <p className="text-sm text-base-content/70">
                Click to upload images
              </p>
              <p className="mt-1 text-xs text-base-content/50">
                JPG or PNG, up to 3 images
              </p>
            </label>
          </div>
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {imagePreviews.map((preview, idx) => (
                <div key={idx} className="group relative">
                  <img
                    src={preview}
                    alt={`Preview ${idx + 1}`}
                    className="border border-base-300 rounded-lg w-20 h-20 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="-top-2 -right-2 absolute bg-error opacity-0 group-hover:opacity-100 p-1 rounded-full text-white transition-opacity"
                  >
                    <CloseIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
}
//TODO: the payoutday must be modified as editing and deleing was not possible to do
export function EditUpdateModal({
  update,
  onClose,
  listingId,
  onSuccess,
  updateId,
}) {
  const [imagePreviews, setImagePreviews] = useState([]);
  const { farmer } = useAPI();
  const mutate = useMutation({
    mutationFn: (data) =>
      farmer.editListingUpdate({ listingId, updateId, data }),
    onSuccess: () => {
      onSuccess();
      onClose();
      reset();
      setImagePreviews([]);
      toast.success("Update posted to investors");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to post update");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      title: "",
      body: "",
      images: [],
    },
  });

  useEffect(() => {
    if (update) {
      setValue("title", update.title);
      setValue("body", update.body);
      if (update.images && update.images.length > 0) {
        setImagePreviews(update.images);
      }
    }
  }, [update, setValue]);
  //TODO: fix when we change photo then the images from the update vanish
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    setValue("images", files);
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setValue(
      "images",
      imagePreviews.filter((_, i) => i !== index),
    );
  };

  const onSubmit = (data) => {
    console.log("Edit form data:", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", data.body);
    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => formData.append("images", image));
    }

    mutate.mutate(formData);
  };

  const bodyValue = watch("body") || "";

  return (
    <Modal open={!!update} onClose={onClose} title="Edit Update" size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
        <div>
          <label className="font-semibold label-text">Title</label>
          <input
            {...register("title")}
            maxLength={100}
            className="mt-1.5 rounded-xl w-full input input-bordered"
          />
          {errors.title && (
            <p className="mt-1 text-error text-xs">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="font-semibold label-text">Body</label>
          <textarea
            {...register("body")}
            maxLength={2000}
            rows={5}
            className="mt-1.5 rounded-xl w-full textarea textarea-bordered"
          />
          <div className="flex justify-between mt-1">
            <p className="text-[11px] text-muted-foreground">
              {errors.body && (
                <span className="text-error">{errors.body.message}</span>
              )}
            </p>
            <p className="text-[11px] text-muted-foreground text-right">
              {bodyValue.length}/2000
            </p>
          </div>
        </div>
        {imagePreviews.length > 0 && (
          <div>
            <label className="font-semibold label-text">Current images</label>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {imagePreviews.map((img, i) => (
                <div key={img.url} className="group relative">
                  <img
                    src={img.url}
                    className="border border-base-300 rounded-lg w-20 h-20 object-cover"
                    alt=""
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="-top-2 -right-2 absolute bg-error opacity-0 group-hover:opacity-100 p-1 rounded-full text-white transition-opacity"
                  >
                    <CloseIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="form-control">
          <label className="label">
            <span className="font-medium label-text">
              Replace images (optional)
            </span>
          </label>
          <div className="p-8 border-2 border-base-300 hover:border-primary border-dashed rounded-lg text-center transition-colors cursor-pointer">
            <input
              type="file"
              className="hidden"
              id="edit-update-images"
              multiple
              accept=".jpg,.png,.jpeg"
              max={3}
              {...register("images")}
              onChange={handleImageChange}
            />
            <label htmlFor="edit-update-images" className="cursor-pointer">
              <ImageIcon className="mx-auto mb-3 w-12 h-12 text-base-content/40" />
              <p className="text-sm text-base-content/70">
                Click to upload images
              </p>
              <p className="mt-1 text-xs text-base-content/50">
                JPG or PNG, up to 3 images
              </p>
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            disabled={mutate.isPending}
            onClick={onClose}
            className="btn btn-ghost btn-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutate.isPending}
            className="btn btn-primary btn-sm"
          >
            {mutate.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function DeleteModal({ open, onClose, update, listingId, onSuccess }) {
  const { farmer } = useAPI();
  const mutate = useMutation({
    mutationFn: () =>
      farmer.deleteListingUpdate({ listingId, updateId: update._id }),
    onSuccess: () => {
      onSuccess();
      onClose();
      toast.success("Update deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete update");
    },
  });

  const handleDelete = () => {
    mutate.mutate();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Update"
      size="sm"
      footer={
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={mutate.isPending}
            className="btn btn-ghost btn-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={mutate.isPending}
            className="btn btn-error btn-sm"
          >
            {mutate.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      }
    >
      <div className="p-6">
        <p className="text-base-content/70">
          Are you sure you want to delete this update? This action cannot be
          undone.
        </p>
        {/* {update && (
          <div className="bg-base-200 mt-4 p-3 rounded-lg">
            <p className="font-semibold text-sm">{update.title}</p>
            <p className="mt-1 text-xs text-base-content/60 line-clamp-2">
              {update.body}
            </p>
          </div>
        )} */}
      </div>
    </Modal>
  );
}

export default PostUpdateModal;
