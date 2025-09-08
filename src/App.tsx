
import {BrowserRouter,Route,Routes} from "react-router-dom"
import './App.css'
import Layout from './components/layout'
import { ThemeProvider } from './context/theme-provider'
import WeatherDashboard from './Pages/weather-dashboard'
import CityPages from './Pages/city-pages'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,         // 5 minutes
      cacheTime: 10 * 60 * 1000,        // 10 minutes (instead of gcTime)
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});


function App() {
return (
    <>
    <QueryClientProvider client={queryClient}>
     <BrowserRouter>
     <ThemeProvider defaultTheme='dark'>
      <Layout>
        <Routes>
          <Route path='/' element={<WeatherDashboard />}></Route>
           <Route path='/city/:cityName' element={<CityPages/>}></Route>
        </Routes>
      </Layout>
     </ThemeProvider>
     </BrowserRouter>
       <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
    </>
  )
}

export default App
