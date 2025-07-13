import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface CloudinaryResponse {
  asset_id?: string;
  public_id?: string;
  url?: string;
  secure_url?: string;
  type?: 'image' | 'video';
  localUrl: string;
  loading: boolean;
}

interface ImageState {
  loading: boolean;
  error: string | null;
}

const initialState: ImageState = {
  loading: false,
  error: null,
};

export const uploadImages = createAsyncThunk<
  CloudinaryResponse[],
  File[],
  { rejectValue: string }
>('images/uploadMultiple', async (files, { rejectWithValue }) => {
  try {
    const uploadPromises = files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'devmun');

      return axios
        .post<CloudinaryResponse>(
          'https://api.cloudinary.com/v1_1/dft8nx292/auto/upload',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )
        .then((res) => res.data);
    });

    const results = await Promise.all(uploadPromises);
    return results;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.error?.message || 'Upload failed',
      );
    }
    return rejectWithValue('Unknown error occurred');
  }
});

export const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImages.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to upload images';
      });
  },
});

export default imageSlice.reducer;
