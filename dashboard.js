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

const tableBody = document.getElementById("posts-table");

    // Fetch posts
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, content, created_at");

      if (error) {
        console.error("Error fetching posts:", error);
        tableBody.innerHTML = `<tr><td colspan="5">Error loading posts</td></tr>`;
        return;
      }

      if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5">No posts found.</td></tr>`;
        return;
      }

      tableBody.innerHTML = "";
      data.forEach(post => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${post.id}</td>
          <td contenteditable="true">${post.title}</td>
          <td contenteditable="true">${post.content.substring(0, 100)}</td>
          <td>${new Date(post.created_at).toLocaleString()}</td>
          <td>
            <button onclick="updatePost(${post.id}, this)">Save</button>
            <button onclick="deletePost(${post.id})">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }

    // Update post
    window.updatePost = async function (id, btn) {
      const row = btn.closest("tr");
      const title = row.children[1].innerText;
      const content = row.children[2].innerText;

      const { error } = await supabase
        .from("posts")
        .update({ title, content })
        .eq("id", id);

      if (error) {
        alert("Error updating post");
        console.error(error);
      } else {
        alert("Post updated!");
      }
    };

    // Delete post
    window.deletePost = async function (id) {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

      if (error) {
        alert("Error deleting post");
        console.error(error);
      } else {
        alert("Post deleted!");
        fetchPosts();
      }
    };

    // Load posts on page load
    fetchPosts();