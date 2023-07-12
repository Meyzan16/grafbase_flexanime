"use client"

import { SessionInterface } from "@/common.types"
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createNewProject } from "@/lib/actions";
import { fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  type: string,
  session: SessionInterface,
}

const ProjectForm = ({type , session} : Props) => {

    const router = useRouter();
  
    const [submitting, setsubmitting] = useState(false);

    const [form,setform] = useState({
      title: '',
      description: '',
      image: '',
      genre: '',
      liveSiteUrl: '',
      category: '',
  
    });

 

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if(!file) return;
    if(!file.type.includes('image')) {
      return alert('Please upload an image file');
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange('image', result);
    }
  };

  const handleStateChange = (fieldName:string, value: string) => {
    setform((prevState) => ({...prevState, [fieldName]: value}))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setsubmitting(true);
    const {token} =  await fetchToken();
    try {
      if(type === 'create') {
        //create a new project
        await createNewProject(form, session?.user?.id, token);

        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setsubmitting(false);
    };
  };



  return (
    <form
      onSubmit={handleFormSubmit}
      className="flexStart form"
    >
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
            {!form.image && 'Choose a new image anime'}
        </label>
        <input 
          id="image" type="file" accept="image/*" required={type === 'create'}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {
          form.image && (
            <Image
              src={form?.image}
              className="sm:p-10 object-contain z-20"
              alt="project poster"
              fill 
            />
          )
        }
      </div>  

      <FormField 
        title="title"
        state={form.title}
        placeholder="Flexanime"
        setState ={(value) => handleStateChange('title', value)}
      />
      <FormField 
        title="description"
        state={form.description}
        placeholder="Showcas and discover anime collection"
        setState ={(value) => handleStateChange('description', value)}
      />
      <FormField 
        title="genre"
        state={form.genre}
        placeholder="create genre collection"
        setState ={(value) => handleStateChange('genre', value)}
      />
      <FormField
        type="url" 
        title="website URL"
        state={form.liveSiteUrl}
        placeholder="http://portopolio...."
        setState ={(value) => handleStateChange('liveSiteUrl', value)}
      />

      <CustomMenu 
          title="category"
          state={form.category}
          filters={categoryFilters}
          setState={(value) => handleStateChange('category', value)}
      />

      <div className="flexStart w-full">
        <Button 
         title={
            submitting 
                ? `${type === "create" 
                ? "Creating" : "Editing"}` 
                : `${type === "create" 
                ? "Create" : "Edit"}`}

          type="submit"
          leftIcon={submitting ? "" : '/plus.svg'}
          submitting={submitting}
        />

      </div>

    </form>
  )
}

export default ProjectForm
