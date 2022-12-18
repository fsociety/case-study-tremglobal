<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;

class FormController extends Controller
{
    public function save(Request $request)
    {
        $validated = $request->validate([
            'fullname' => 'required',
            'email' => 'required|email|unique:forms,email',
            'phone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|unique:forms,phone',
            'address' => 'required'
        ]);

        try {
            Form::create($validated);
            return response()->json([
                'success','Successfully added'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'error','something went wrong'
            ]);
        }

    }
}
