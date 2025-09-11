import { useGeolocation } from '@/components/hooks/use-geolocation'
import WeatherSkeleton from '@/components/loading-skeleton';
import { Button } from '@/components/ui/button'
import { MapPin, RefreshCw } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/components/hooks/use-weather';
import CurrentWeather from '@/components/current-weather';
import HourlyTemparature from '@/components/hourly-temparature';
import WeatherDetails from '@/components/weather-details';
import WeatherForecast from '@/components/weather-forcast';

const weatherDashboard = () => {
const 
{coordinates,
  error:locationError,
  getLocation,
  isLoading:locationLoading,
}=useGeolocation();


 const weatherQuery = useWeatherQuery(coordinates);
 const forecastQuery =useForecastQuery(coordinates);
 const locationQuery = useReverseGeocodeQuery(coordinates);

 console.log(weatherQuery.data);
  
    const handleRefresh=()=>{
      getLocation();
      if(coordinates){
     weatherQuery.refetch();
     forecastQuery.refetch();
     locationQuery.refetch();
      }
    }
   if(locationLoading){
    return <WeatherSkeleton/>
   }
   if(locationError){
    return (<Alert variant="destructive">
  <AlertTitle>Location Error...</AlertTitle>
  <AlertDescription className='flex flex-col gap-4'>
    <p>{locationError}</p>
    <Button onClick={getLocation} variant={"outline"} className='w-fit'>
        <MapPin className="mr-2 h-4 w-4" />
        Enable Location
    </Button>
  </AlertDescription>
</Alert>
    )
   }

    if(!coordinates){
    return (<Alert variant="destructive">
  <AlertTitle>Location required</AlertTitle>
  <AlertDescription className='flex flex-col gap-4'>
    <p>Please enable location access to see your local weather.</p>
    <Button onClick={getLocation} variant={"outline"} className='w-fit'>
        <MapPin className="mr-2 h-4 w-4" />
        Enable Location
    </Button>
  </AlertDescription>
</Alert>
    )
   }

 const locationName=locationQuery.data?.[0];

 if(weatherQuery.error || forecastQuery.error){
return (<Alert variant="destructive">
  <AlertTitle>Location Error...</AlertTitle>
  <AlertDescription className='flex flex-col gap-4'>
    <p>Failed to fetch data .Please, try again.</p>
    <Button onClick={getLocation} variant={"outline"} className='w-fit'>
        <RefreshCw className="mr-2 h-4 w-4" />
        retry
    </Button>
  </AlertDescription>
</Alert>
    )
 }

 if(!weatherQuery.data || !forecastQuery.data){
  return <WeatherSkeleton />;
 }
  return (
    <div className='space-y-4'>
     <div className='flex items-center justify-between'>
      <h1 className='text-xl font-bold tracking-tight'>my Location</h1>
      <Button variant={'outline'}
      size={"icon"}
      onClick={handleRefresh}
      disabled={weatherQuery.isFetching || forecastQuery.isFetching}
      >
        <RefreshCw className={`h-4 w-4' ${weatherQuery.isFetching ? "animate-spin" : ""} `}/>
      </Button>
     </div>

     <div className='grid gap-6'>
      <div className='flex flex-row lg:flex-row gap-4'>
        < CurrentWeather 
        data={weatherQuery.data}
        locationname={locationName}
        />
       {/*current weather */}
       {/*hourly temperature */}
       
       <HourlyTemparature data={forecastQuery.data} />

      </div>

      <div className='grid gap-6 md:grid-cols-2 items-start'>
        <WeatherDetails data={weatherQuery.data}/>
       {/*details*/}
       {/*forcast*/}
       <WeatherForecast data={forecastQuery.data} />
      </div>
     </div>
    </div>
  )
}

export default weatherDashboard
