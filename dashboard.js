import { supabase } from "./supabase.js";

const postForm = document.getElementById("postForm");

postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const file = document.getElementById("image").files[0];

  if (!file) {
    alert("Please select an image");
    return;
  }

  try {
    // 1. Upload image to Supabase Storage
    const filePath = `public/images/${Date.now()}_${file.name}`;
    const { data: imageData, error: imageError } = await supabase
      .storage
      .from("post-images") // your bucket name
      .upload(filePath, file);

    if (imageError) throw imageError;

    // 2. Get public URL for the image
    const { data: { publicUrl } } = supabase
      .storage
      .from("post-images")
      .getPublicUrl(filePath);

    // 3. Insert post into Supabase table
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title: title,
          content: content,
          author: "Admin", // later replace with Firebase UID or email
          image_url: publicUrl
        }
      ]);

    if (error) throw error;

    alert("Post published successfully!");
    postForm.reset();
  } catch (err) {
    console.error("Error publishing post:", err.message);
    alert("Failed to publish post.");
  }
});
