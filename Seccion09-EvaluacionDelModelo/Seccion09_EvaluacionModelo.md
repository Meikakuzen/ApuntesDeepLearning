# Sección 9 - Evaluación del modelo (PARTE I)

- Ante un modelo que lo que hace es clasificar datos de forma supervisada, por lo tanto de resultado cualitativo se puede calcular la precisión.

    - Dividir el número de aciertos por n datos
    - Precisión de 300 aciertos de 500 datos === 0.6, el 60%
- También se puede calcular el error
>error = 1 - precisión

- Los problemas de clasificación y regresión no son tan diferentes.

- Tenemos el valor obtenido del modelo y el valor esperado.
- El error  es **la resta** de ambos
- El error cuadrático es el resultado al cuadrado del error
- Se mide en valores positivos, **no hay negativos**, si no **despenalizaría** el error al calcular el error absoluto.
> El *error cuadrático* penaliza más severamente el error
- El *error absoluto* es la suma de todos los errores
- el error cuadrático es la suma de todos los errores al cuadrado ( individualmente )
---
### Es importante usar el error absoluto y no el error
----
- MSE son las siglas de error cuadrático medio.
    - Se coge el total de la suma de los errores al cuadrado y se divide por n errores
- MAE son las siglas de media error absoluto, el total de errores dividido por n errores




 
