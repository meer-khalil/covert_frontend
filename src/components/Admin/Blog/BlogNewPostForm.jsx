import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
// import { LoadingButton } from '@mui/lab';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import {
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel
} from '@mui/material';
// utils
// import fakeRequest from '../../../utils/fakeRequest';
//
import { QuillEditor } from '../../editor';
import { UploadSingleFile } from '../../upload';
import api from '../../../util/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// import Editor from './Editor';
//
// import BlogNewPostPreview from './BlogNewPostPreview';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(10).required('Content is required'),
    cover: Yup.mixed().required('Cover is required')
  });

  const UpdateBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(10).required('Content is required'),
    // cover: Yup.mixed().required('Cover is required')
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      content: '',
      cover: null,
      tags: [],
      publish: true,
      comments: true,
      metaTitle: '',
      metaDescription: '',
      metaKeywords: ['Logan']
    },
    validationSchema: id ? UpdateBlogSchema : NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        console.log('Values: ', values);
        let copy = { ...values }

        const formData = new FormData();

        if (values.cover) {
          const cover = copy.cover;
          delete copy.cover
          formData.append("cover", cover)
        }

        let result = []
        values.tags.forEach((e) => {
          for (let i = 0; i < categories?.length; i++) {
            if (categories[i].name === e) {
              result.push(categories[i]._id)
              break;
            }
          }
        })
        copy.tags = result

        formData.append("data", JSON.stringify(copy));

        if (id) {
          const { data } = await api.put(`/blogs/admin/blog/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })

          toast("Blog Updated Successfuly!")
        } else {
          const { data } = await api.post('/admin/blog/new', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          toast("Blog Created Successfuly!")
        }

        resetForm();
        handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar('Post success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        console.log('\n\nfile: ', file);
        setFieldValue('cover', file);
        setFieldValue('coverpreview', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );


  const getCategories = async () => {
    const { data } = await api.get('/categories')
    console.log('categories: ', data.categories);
    setCategories(data.categories)
  }

  const getPostData = async (id) => {
    try {
      const { data } = await api.get(`/blogs/${id}`)
      const blog = data
      setFieldValue('title', blog.title);
      setFieldValue('description', blog.description);
      setFieldValue('content', blog.content);

      setFieldValue('cover', blog.cover);
      setFieldValue('coverpreview', {
        preview: `${process.env.REACT_APP_BACKEND_RESOURCE}/images/blog/${blog.cover.filename}`
      });
      setFieldValue('tags', blog.tags?.map(tag => tag.name))
      console.log('Blog', blog);
    } catch (error) {
      console.log('error', error);
      toast("Error Getting the blog data")
    }
  }
  useEffect(() => {
    getCategories();
    if (id) {
      getPostData(id)
    }
  }, [])

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: { xs: 1, md: 3 } }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Blog Title"
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Description"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />

                  <div>
                    <LabelStyle>Content</LabelStyle>
                    <QuillEditor
                      id="post-content"
                      value={values.content}
                      onChange={(val) => setFieldValue('content', val)}
                      error={Boolean(touched.content && errors.content)}
                    />
                    {touched.content && errors.content && (
                      <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                        {touched.content && errors.content}
                      </FormHelperText>
                    )}
                    {/* <div className=' h-[200px] mb-8'>
                      <Editor
                        value={values.content}
                        onChange={(val) => setFieldValue('content', val)}
                        error={Boolean(touched.content && errors.content)}
                      />
                    </div> */}
                  </div>

                  <div>
                    <LabelStyle>Cover</LabelStyle>
                    <UploadSingleFile
                      maxSize={3145728}
                      accept="image/*"
                      file={values.coverpreview}
                      onDrop={handleDrop}
                      error={Boolean(touched.cover && errors.cover)}
                    />
                    {touched.cover && errors.cover && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.cover && errors.cover}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: { xs: 1, md: 3 } }}>
                <Stack spacing={3}>
                  <div>
                    <FormControlLabel
                      control={<Switch {...getFieldProps('publish')} checked={values.publish} />}
                      label="Publish"
                      labelPlacement="start"
                      sx={{ mb: 1, mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />

                    <FormControlLabel
                      control={<Switch {...getFieldProps('comments')} checked={values.comments} />}
                      label="Enable comments"
                      labelPlacement="start"
                      sx={{ mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />
                  </div>

                  {
                    categories && (
                      <Autocomplete
                        multiple
                        freeSolo
                        value={values.tags}
                        onChange={(event, newValue) => {
                          setFieldValue('tags', newValue);
                          console.log('newValue: ', newValue);
                          // setFieldValue('tags', categories.filter(e => { if (e.name === newValue) return e._id }));
                        }}
                        options={categories?.map((option) => option.name)}
                        renderTags={(value, getTagProps) =>
                          value?.map((option, index) => (
                            <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                          ))
                        }
                        renderInput={(params) => <TextField {...params} label="Tags" />}
                      />
                    )
                  }

                  <TextField fullWidth label="Meta title" {...getFieldProps('metaTitle')} />

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Meta description"
                    {...getFieldProps('metaDescription')}
                  />

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('metaKeywords', newValue);
                    }}
                    options={TAGS_OPTION?.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value?.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Meta keywords" />}
                  />
                </Stack>
              </Card>

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                {/* <Button
                  fullWidth
                  type="button"
                  color="inherit"
                  variant="outlined"
                  size="large"
                  onClick={handleOpenPreview}
                  sx={{ mr: 1.5 }}
                >
                  Preview
                </Button> */}
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  {id ? "Update" : "Post"}
                </LoadingButton>
                {/* <Button fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  {id ? "Update" : "Post"}
                </Button> */}
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>

      {/* <BlogNewPostPreview formik={formik} openPreview={open} onClosePreview={handleClosePreview} /> */}
    </>
  );
}
