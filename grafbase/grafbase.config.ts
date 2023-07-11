import { g, auth, config } from '@grafbase/sdk'

const User = g.model('User', {
  name: g.string().length({min:2, max:20}),
  email: g.string().unique(),
  avatarUrl: g.string(),
  description: g.string().optional(),
  projects: g.relation(() => Project).list().optional(),  
})

const Project = g.model('Project', {
  title: g.string().length({min:3}),
  description: g.string(),
  image: g.string(),
  liveSiteUrl: g.string(),
  category: g.string().search(),
  createdBy: g.relation(() => User),
})


export default config({
  schema: g
})
